#!/usr/bin/env node
/**
 * Ingest legacy HTML content from the workspace root into Next.js public assets
 * - Copies non-HTML assets to public/legacy/site
 * - Parses and transforms HTML files to remove scripts, rewrite asset links, and convert .html hrefs to clean routes
 * - Generates a manifest mapping routes -> processed html path + metadata
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let parseHTML;
try {
  // Lazy import linkedom if available
  ({ parseHTML } = await import('linkedom'));
} catch (err) {
  console.warn('[ingest] Optional dependency "linkedom" not found. Falling back to regex-based parsing.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WEB_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(WEB_DIR, '..');
const SRC_ROOT = REPO_ROOT; // where legacy files currently live
const DEST_SITE = path.join(WEB_DIR, 'public', 'legacy', 'site');
const DEST_PROCESSED = path.join(WEB_DIR, 'public', 'legacy', 'processed');
const MANIFEST_PATH = path.join(WEB_DIR, 'public', 'legacy', 'manifest.json');

const EXCLUDED_DIRS = new Set([
  'web',
  '.git',
  '.next',
  'node_modules',
  '.cursor',
]);

const ASSET_ALLOW_EXT = new Set([
  // images
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.bmp', '.avif',
  // styles
  '.css',
  // scripts (not executed by processed html, but required by raw assets)
  '.js', '.mjs', '.cjs',
  // fonts
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  // data
  '.json', '.xml', '.txt', '.map',
  // media
  '.mp3', '.ogg', '.wav', '.mp4', '.webm', '.mov', '.m4v', '.avi', '.mkv', '.mpg', '.mpeg',
]);

const HTML_EXT = new Set(['.html', '.htm']);

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* await walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function isExternalUrl(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');
}

function isHash(url) {
  return url.startsWith('#');
}

function stripHtmlExt(p) {
  if (p.endsWith('.html')) return p.slice(0, -5);
  if (p.endsWith('.htm')) return p.slice(0, -4);
  return p;
}

function normalizeRoute(p) {
  // Ensure leading slash, remove trailing '/index'
  let route = p.startsWith('/') ? p : `/${p}`;
  route = stripHtmlExt(route);
  route = route.replace(/\/index$/i, '');
  // Collapse multiple slashes
  route = route.replace(/\/+/, '/');
  // Encode each segment except '/'
  const segments = route.split('/').filter(Boolean).map(s => encodeURIComponent(s));
  return '/' + segments.join('/');
}

function resolvePathLike(baseDirRel, hrefValue) {
  // baseDirRel: e.g., 'aion/sub'
  // hrefValue may be absolute ('/a/b'), relative ('c/d'), or protocol/external
  if (isExternalUrl(hrefValue) || isHash(hrefValue)) return hrefValue;
  const baseUrl = new URL(`https://example.com/${baseDirRel ? baseDirRel + '/' : ''}`);
  const resolved = new URL(hrefValue, baseUrl);
  // normalized absolute path beginning with '/'
  return resolved.pathname;
}

function rewriteAnchorHref(fileRelDir, hrefValue) {
  const resolvedPath = resolvePathLike(fileRelDir, hrefValue);
  if (isExternalUrl(hrefValue) || isHash(hrefValue)) return hrefValue;
  // Map .html/.htm links to clean routes
  return normalizeRoute(resolvedPath);
}

function rewriteAssetUrl(fileRelDir, urlValue) {
  if (isExternalUrl(urlValue) || isHash(urlValue)) return urlValue;
  const resolvedPath = resolvePathLike(fileRelDir, urlValue);
  return `/legacy/site${resolvedPath}`.replace(/\/+/, '/');
}

function extractMetaRegex(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i) ||
                    html.match(/<meta[^>]+content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : undefined;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html; // fallback to all
  return { title, description, body };
}

function serializeDocument(doc) {
  // Return inner HTML of <body> if exists, else document as-is
  const body = doc.querySelector('body');
  const html = body ? body.innerHTML : doc.documentElement?.innerHTML || '';
  return html;
}

async function processHtmlFile(absFilePath) {
  const relFromRoot = toPosix(path.relative(SRC_ROOT, absFilePath));
  const ext = path.extname(relFromRoot).toLowerCase();
  const relDir = toPosix(path.dirname(relFromRoot));
  const raw = await fs.readFile(absFilePath, 'utf8');

  let title, description, processedBody;

  if (parseHTML) {
    const { document } = parseHTML(raw);
    // Remove all script tags
    document.querySelectorAll('script').forEach((el) => el.remove());
    // Remove base tags
    document.querySelectorAll('base').forEach((el) => el.remove());

    // Rewrite anchors
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const newHref = rewriteAnchorHref(relDir === '.' ? '' : relDir, href);
      a.setAttribute('href', newHref);
    });

    const resourceSelectors = [
      ['img', 'src'],
      ['script', 'src'],
      ['link', 'href'],
      ['source', 'src'],
      ['video', 'src'],
      ['audio', 'src'],
      ['iframe', 'src'],
    ];

    for (const [sel, attr] of resourceSelectors) {
      document.querySelectorAll(`${sel}[${attr}]`).forEach((el) => {
        const val = el.getAttribute(attr);
        if (!val) return;
        const newUrl = rewriteAssetUrl(relDir === '.' ? '' : relDir, val);
        el.setAttribute(attr, newUrl);
      });
    }

    // Meta
    const titleEl = document.querySelector('title');
    if (titleEl) title = titleEl.textContent?.trim() || undefined;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) description = descEl.getAttribute('content') || undefined;

    processedBody = serializeDocument(document);
  } else {
    // Simple regex fallback: remove scripts, extract/meta, and rewrite basic href/src
    const meta = extractMetaRegex(raw);
    title = meta.title;
    description = meta.description;
    let body = meta.body;

    // Remove script tags
    body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

    // Anchors
    body = body.replace(/<a\b([^>]*?)href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))([^>]*)>/gi, (m, pre, q, v1, v2, v3, post) => {
      const href = v1 || v2 || v3 || '';
      const newHref = rewriteAnchorHref(relDir === '.' ? '' : relDir, href);
      return `<a${pre}href="${newHref}"${post}>`;
    });

    // Generic src/href on known tags
    const replaceAttr = (tag, attr) => {
      const re = new RegExp(`<${tag}\\b([^>]*?)${attr}\\s*=\\s*(\"([^\"]*)\"|'([^']*)'|([^\\s>]+))([^>]*)>`, 'gi');
      body = body.replace(re, (m, pre, q, v1, v2, v3, post) => {
        const val = v1 || v2 || v3 || '';
        const newVal = rewriteAssetUrl(relDir === '.' ? '' : relDir, val);
        return `<${tag}${pre}${attr}="${newVal}"${post}>`;
      });
    };
    [['img','src'],['script','src'],['link','href'],['source','src'],['video','src'],['audio','src'],['iframe','src']].forEach(([t,a])=>replaceAttr(t,a));

    processedBody = body;
  }

  // Route mapping
  const routeRaw = normalizeRoute(stripHtmlExt('/' + relFromRoot));
  const isIndex = /\/index$/i.test(routeRaw);
  const route = isIndex ? routeRaw.replace(/\/index$/i, '') || '/' : routeRaw;

  // Destination write path for processed body
  const destProcessedAbs = path.join(DEST_PROCESSED, relFromRoot);
  await ensureDir(path.dirname(destProcessedAbs));
  await fs.writeFile(destProcessedAbs, processedBody, 'utf8');

  return {
    route,
    processedRelative: toPosix(path.relative(path.join(WEB_DIR, 'public', 'legacy'), destProcessedAbs)),
    title,
    description,
  };
}

async function copyAsset(absFilePath) {
  const relFromRoot = path.relative(SRC_ROOT, absFilePath);
  const destAbs = path.join(DEST_SITE, relFromRoot);
  await ensureDir(path.dirname(destAbs));
  await fs.copyFile(absFilePath, destAbs);
}

async function main() {
  console.log('[ingest] Starting ingest from', SRC_ROOT);
  await Promise.all([ensureDir(DEST_SITE), ensureDir(DEST_PROCESSED), ensureDir(path.dirname(MANIFEST_PATH))]);

  const entries = [];
  let countHtml = 0;
  let countAssets = 0;

  for await (const absFilePath of walk(SRC_ROOT)) {
    const relFromRoot = path.relative(SRC_ROOT, absFilePath);
    // Skip anything under web/
    if (relFromRoot.startsWith(`web${path.sep}`)) continue;

    const ext = path.extname(relFromRoot).toLowerCase();
    if (HTML_EXT.has(ext)) {
      try {
        const entry = await processHtmlFile(absFilePath);
        entries.push(entry);
        countHtml += 1;
      } catch (err) {
        console.warn('[ingest] Failed to process HTML:', relFromRoot, err?.message || err);
      }
    } else if (ASSET_ALLOW_EXT.has(ext)) {
      try {
        await copyAsset(absFilePath);
        countAssets += 1;
      } catch (err) {
        console.warn('[ingest] Failed to copy asset:', relFromRoot, err?.message || err);
      }
    }
  }

  // Deduplicate entries by route, prefer shortest path (index vs explicit)
  const routeToEntry = new Map();
  for (const e of entries) {
    const existing = routeToEntry.get(e.route);
    if (!existing) routeToEntry.set(e.route, e);
    else {
      // choose the one whose processed path filename is 'index.html' if available
      const isIndexNew = /\/(?:[^/]+\/)*index\.(?:html|htm)$/i.test(e.processedRelative);
      const isIndexOld = /\/(?:[^/]+\/)*index\.(?:html|htm)$/i.test(existing.processedRelative);
      if (isIndexNew && !isIndexOld) routeToEntry.set(e.route, e);
    }
  }

  const manifest = Array.from(routeToEntry.values()).sort((a, b) => a.route.localeCompare(b.route));
  await fs.writeFile(MANIFEST_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), count: manifest.length, entries: manifest }, null, 2), 'utf8');

  console.log(`[ingest] Processed ${countHtml} HTML files, copied ${countAssets} assets.`);
  console.log(`[ingest] Manifest at ${toPosix(path.relative(WEB_DIR, MANIFEST_PATH))} with ${manifest.length} routes.`);
}

main().catch((err) => {
  console.error('[ingest] Fatal error:', err);
  process.exit(1);
});

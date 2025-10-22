import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

type ManifestEntry = {
  route: string;
  processedRelative: string;
  title?: string;
  description?: string;
};

async function loadManifest(): Promise<{ entries: ManifestEntry[] } | null> {
  const manifestPath = path.join(process.cwd(), "public", "legacy", "manifest.json");
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw) as { entries: ManifestEntry[] };
  } catch {
    return null;
  }
}

function pathFromParams(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return "/" + slug.map(encodeURIComponent).join("/");
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const manifest = await loadManifest();
  const route = pathFromParams(params.slug);
  const entry = manifest?.entries.find((e) => e.route === route);
  if (!entry) return {};
  return {
    title: entry.title || undefined,
    description: entry.description || undefined,
  } as any;
}

export default async function LegacyPage({ params }: { params: { slug?: string[] } }) {
  const manifest = await loadManifest();
  if (!manifest) notFound();
  const route = pathFromParams(params.slug);
  const entry = manifest.entries.find((e) => e.route === route);
  if (!entry) notFound();

  const abs = path.join(process.cwd(), "public", "legacy", entry.processedRelative);
  let html = await fs.readFile(abs, "utf8");

  return (
    <article className="prose max-w-3xl px-4 py-8 dark:prose-invert sm:px-6 lg:max-w-4xl lg:px-8">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

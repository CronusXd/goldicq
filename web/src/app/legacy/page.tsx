import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type ManifestEntry = {
  route: string;
  processedRelative: string;
  title?: string;
  description?: string;
};

async function loadManifest(): Promise<ManifestEntry[]> {
  const manifestPath = path.join(process.cwd(), "public", "legacy", "manifest.json");
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const json = JSON.parse(raw) as { entries: ManifestEntry[] };
    return json.entries;
  } catch {
    return [];
  }
}

export default async function LegacyIndex() {
  const entries = await loadManifest();
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Conteúdo legado ingerido</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Lista de rotas geradas a partir dos arquivos HTML.
        </p>
        <ul className="mt-6 grid gap-2">
          {entries.length === 0 && (
            <li className="text-sm text-zinc-500">Nenhum conteúdo processado ainda.</li>
          )}
          {entries.slice(0, 200).map((e) => (
            <li key={e.route}>
              <Link href={e.route} className="text-blue-600 hover:underline">
                {e.title || e.route}
              </Link>
            </li>
          ))}
          {entries.length > 200 && (
            <li className="text-sm text-zinc-500">… e mais {entries.length - 200} rotas</li>
          )}
        </ul>
      </div>
    </section>
  );
}

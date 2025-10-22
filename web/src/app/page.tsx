import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Migração de HTML para React + TypeScript
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Todas as páginas .html serão servidas em rotas modernas do Next.js com layout responsivo, otimizações e assets estáticos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aboutus" className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100">
                Ver exemplo: Sobre
              </Link>
              <Link href="/legacy" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                Navegar conteúdo legado
              </Link>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Ingestão dos arquivos .html e assets</li>
              <li>Reescrita de links para rotas limpas</li>
              <li>Layout base aplicado a todo conteúdo</li>
              <li>Rewrites .html {'>'} rotas Next</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

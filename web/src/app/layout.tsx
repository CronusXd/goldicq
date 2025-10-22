import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Site Modernizado",
    template: "%s · Site Modernizado",
  },
  description: "Versão React/Next.js das páginas legadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-dvh flex flex-col">
          <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                Legacy → React
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/" className="hover:underline">Início</Link>
                <Link href="/aboutus" className="hover:underline">Sobre</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-black/5 dark:border-white/10 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-zinc-600 dark:text-zinc-400">
              <p>© {new Date().getFullYear()} Site Modernizado. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

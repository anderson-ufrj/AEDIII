"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logoIF.png"
              alt="IFSULDEMINAS"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="border-l pl-3 hidden sm:block">
              <h1 className="text-xl font-bold">AED III</h1>
              <p className="text-xs text-muted-foreground">Ciência da Computação</p>
            </div>
          </Link>

          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/">Início</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/content">Conteúdo</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/#pdfs">PDFs</Link>
            </Button>
            <div className="border-l pl-2 ml-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>

        {/* Search bar mobile */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

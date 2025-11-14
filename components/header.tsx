"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { SkipLink } from "@/components/skip-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, BookOpen, FileDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SkipLink />
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50 sticky top-0 z-50" role="banner">
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

          <nav className="flex items-center gap-2 flex-shrink-0" role="navigation" aria-label="Navegação principal">
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/" aria-label="Ir para página inicial">Início</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/content" aria-label="Ver todo o conteúdo">Conteúdo</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex">
              <Link href="/#pdfs" aria-label="Ver PDFs disponíveis">PDFs</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/">
                      <Home className="mr-2 h-5 w-5" />
                      Início
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/content">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Conteúdo
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/#pdfs">
                      <FileDown className="mr-2 h-5 w-5" />
                      PDFs
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="border-l pl-2 ml-2" aria-label="Configurações">
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
    </>
  );
}

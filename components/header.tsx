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
      <header className="border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 sticky top-0 z-50 shadow-sm transition-all duration-200" role="banner">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
            <Image
              src="/logoIF.png"
              alt="IFSULDEMINAS"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
              priority
            />
            <div className="border-l pl-2 md:pl-3 hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">AED III</h1>
              <p className="text-xs text-muted-foreground">Ciência da Computação</p>
            </div>
          </Link>

          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-1 md:gap-2 flex-shrink-0" role="navigation" aria-label="Navegação principal">
            <Button variant="ghost" asChild className="hidden lg:flex hover:bg-primary/10 hover:text-primary transition-colors">
              <Link href="/" aria-label="Ir para página inicial">Início</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex hover:bg-primary/10 hover:text-primary transition-colors">
              <Link href="/content" aria-label="Ver todo o conteúdo">Conteúdo</Link>
            </Button>
            <Button variant="ghost" asChild className="hidden lg:flex hover:bg-primary/10 hover:text-primary transition-colors">
              <Link href="/#pdfs" aria-label="Ver PDFs disponíveis">PDFs</Link>
            </Button>

            {/* Mobile Menu with better touch targets */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-11 w-11 hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] animate-slide-in">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg h-14 hover:bg-primary/10 hover:text-primary transition-all hover:translate-x-1"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/">
                      <Home className="mr-3 h-5 w-5" />
                      Início
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg h-14 hover:bg-primary/10 hover:text-primary transition-all hover:translate-x-1"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/content">
                      <BookOpen className="mr-3 h-5 w-5" />
                      Conteúdo
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg h-14 hover:bg-primary/10 hover:text-primary transition-all hover:translate-x-1"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/#pdfs">
                      <FileDown className="mr-3 h-5 w-5" />
                      PDFs
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="border-l pl-2 ml-2 h-8" aria-label="Configurações">
              <ThemeToggle />
            </div>
          </nav>
        </div>

        {/* Search bar mobile - improved spacing */}
        <div className="md:hidden mt-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <SearchBar />
        </div>
      </div>
      </header>
    </>
  );
}

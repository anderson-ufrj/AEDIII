import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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
          <nav className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Início</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/content">Conteúdo</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#pdfs">PDFs</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50 mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logoIF.png"
              alt="IFSULDEMINAS"
              width={100}
              height={33}
              className="h-8 w-auto"
            />
          </div>
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>
              <strong>Anderson Henrique da Silva</strong>
            </p>
            <p className="mt-1">Bacharelado em Ciência da Computação</p>
            <p className="mt-1">IFSULDEMINAS - Campus Muzambinho</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

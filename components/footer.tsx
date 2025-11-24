import Image from "next/image";
import { Code2, GraduationCap, School } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative border-t-2 bg-gradient-to-b from-background via-muted/30 to-muted/50 backdrop-blur-sm mt-20 overflow-hidden"
      role="contentinfo"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Logo and branding */}
          <div className="flex flex-col items-center md:items-start gap-4 animate-fade-in">
            <div className="group cursor-pointer">
              <Image
                src="/logoIF.png"
                alt="IFSULDEMINAS"
                width={120}
                height={40}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="font-medium">Algoritmos e Estruturas de Dados III</span>
              </div>
              <p className="text-xs text-muted-foreground/70">
                Conteúdo educacional interativo para o curso de Ciência da Computação
              </p>
            </div>
          </div>

          {/* Right: Author info */}
          <div
            className="flex flex-col gap-3 text-center md:text-right animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="inline-flex items-center gap-2 justify-center md:justify-end">
              <GraduationCap className="h-5 w-5 text-primary" />
              <p className="text-base font-bold text-foreground">
                Anderson Henrique da Silva
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Code2 className="h-4 w-4" />
                <span>Bacharelado em Ciência da Computação</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <School className="h-4 w-4" />
                <span>IFSULDEMINAS - Campus Muzambinho</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright and year */}
        <div
          className="mt-8 pt-6 border-t border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-xs text-muted-foreground/70">
            {new Date().getFullYear()} · Material didático para fins educacionais
          </p>
        </div>
      </div>
    </footer>
  );
}

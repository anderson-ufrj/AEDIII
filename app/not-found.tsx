import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="text-center px-4 max-w-lg">
        {/* 404 illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary/20 select-none">
            404
          </div>
          <div className="relative -mt-16">
            <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-primary/50" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Parece que você se perdeu na árvore de busca! O conteúdo que você
          procura pode ter sido movido ou não existe mais.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/content">
              <BookOpen className="mr-2 h-5 w-5" />
              Ver Conteúdos
            </Link>
          </Button>
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Curiosidade:</strong> Em uma Árvore B de ordem 3, a busca
            por um elemento inexistente retorna em tempo O(log n), assim como
            você chegou aqui!
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COURSE_CATEGORIES } from "@/lib/types";
import { FileDown, ExternalLink } from "lucide-react";
import { getCategoryTheme } from "@/lib/category-config";
import { AnimatedHero } from "@/components/animated-hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      {/* Hero Section */}
      <AnimatedHero />

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Categorias do Curso</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore os principais tópicos abordados na disciplina, organizados por área de conhecimento.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COURSE_CATEGORIES.map((category) => {
              const theme = getCategoryTheme(category.id);
              const Icon = theme.icon;

              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 overflow-hidden"
                  style={{ borderLeftColor: `var(--${category.id}-accent, ${theme.accentColor})` }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full ${theme.bgColor} opacity-50`} />
                  <CardHeader className="relative">
                    <div className={`w-12 h-12 rounded-lg ${theme.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 ${theme.color}`} />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group" asChild>
                      <Link href={`/content?category=${category.id}`}>
                        Ver Conteúdo
                        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PDFs Section */}
      <section id="pdfs" className="container mx-auto px-4 py-20 bg-primary/5 -mx-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Material Original do Professor</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Acesse os PDFs originais das aulas para estudar offline ou consultar referências completas.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Árvores AVL
                </CardTitle>
                <CardDescription>Teoria e implementação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/001_-_AVL.pdf" target="_blank" rel="noopener noreferrer">
                    Teoria <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/002_-_AVL-Implementacao.pdf" target="_blank" rel="noopener noreferrer">
                    Implementação <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Árvores Avançadas
                </CardTitle>
                <CardDescription>Rubro-Negra, Splay e B</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/003_-_Arvore_Rubro_Negra.pdf" target="_blank" rel="noopener noreferrer">
                    Rubro-Negra <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/004_-_Splay_Tree.pdf" target="_blank" rel="noopener noreferrer">
                    Splay Tree <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/005_-_Arvore_B.pdf" target="_blank" rel="noopener noreferrer">
                    Árvore B <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Hash e Pesquisa
                </CardTitle>
                <CardDescription>Tabelas e algoritmos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/Tabela Hash.pdf" target="_blank" rel="noopener noreferrer">
                    Tabela Hash <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/pesquisa_completa.pdf" target="_blank" rel="noopener noreferrer">
                    Pesquisa Completa <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Manipulação de Arquivos
                </CardTitle>
                <CardDescription>I/O e organização</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between text-xs" asChild>
                  <a href="/pdfs/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento.pdf" target="_blank" rel="noopener noreferrer">
                    Dispositivos <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between text-xs" asChild>
                  <a href="/pdfs/006_-_Formas_Basicas_de_Organizacao_de_Arquivos.pdf" target="_blank" rel="noopener noreferrer">
                    Organização <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between text-xs" asChild>
                  <a href="/pdfs/007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C.pdf" target="_blank" rel="noopener noreferrer">
                    I/O em C <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Compressão e Segurança
                </CardTitle>
                <CardDescription>Algoritmos avançados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/008_-_Compactacao_de_Arquivos.pdf" target="_blank" rel="noopener noreferrer">
                    Compactação <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/009_-_Criptografia.pdf" target="_blank" rel="noopener noreferrer">
                    Criptografia <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileDown className="h-5 w-5 text-primary" />
                  Técnicas e Exercícios
                </CardTitle>
                <CardDescription>Backtracking e mais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/backtracking.pdf" target="_blank" rel="noopener noreferrer">
                    Backtracking <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/mochila.pdf" target="_blank" rel="noopener noreferrer">
                    Mochila <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/pdfs/Exercícios.pdf" target="_blank" rel="noopener noreferrer">
                    Exercícios <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              💡 Dica: Clique nos PDFs para abrir em uma nova aba. Você pode salvar localmente para estudar offline.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

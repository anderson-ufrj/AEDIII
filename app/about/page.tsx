import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Code2,
  BookOpen,
  Users,
  Github,
  ExternalLink,
  TreeDeciduous,
  Binary,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre o Projeto",
  description:
    "Conheça a plataforma AED III - uma ferramenta educacional interativa para o estudo de Algoritmos e Estruturas de Dados III.",
};

const features = [
  {
    icon: TreeDeciduous,
    title: "Visualizadores Interativos",
    description:
      "Visualize árvores AVL, Rubro-Negra, Splay e B em tempo real com animações suaves.",
  },
  {
    icon: Code2,
    title: "Compilador Online",
    description:
      "Execute código C/C++ diretamente no navegador usando o Judge0 CE.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo Completo",
    description:
      "20 tópicos organizados pedagogicamente, do básico ao avançado.",
  },
  {
    icon: Binary,
    title: "Exercícios Práticos",
    description: "40+ exercícios graduados para fixar o aprendizado.",
  },
  {
    icon: FileCode,
    title: "PWA Offline",
    description: "Acesse o conteúdo mesmo sem conexão com a internet.",
  },
  {
    icon: Users,
    title: "Acessibilidade",
    description: "Suporte a VLibras e navegação completa por teclado.",
  },
];

const stats = [
  { value: "20+", label: "Tópicos de Conteúdo" },
  { value: "40+", label: "Exercícios" },
  { value: "4", label: "Tipos de Árvores" },
  { value: "100%", label: "Gratuito" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Sobre o Projeto AED III</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma educacional interativa desenvolvida para a
              disciplina de Algoritmos e Estruturas de Dados III do
              IFSULDEMINAS.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Recursos da Plataforma
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Desenvolvedor</h2>
              <Card className="p-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Code2 className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Anderson Henrique da Silva
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Bacharelando em Ciência da Computação - IFSULDEMINAS
                  </p>
                  <p className="text-muted-foreground mb-6 max-w-lg">
                    Desenvolvedor apaixonado por educação e tecnologia. Este
                    projeto foi criado com o objetivo de facilitar o
                    aprendizado de estruturas de dados avançadas através de
                    visualizações interativas e conteúdo didático de qualidade.
                  </p>
                  <Button asChild variant="outline">
                    <Link
                      href="https://github.com/anderson-ufrj"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Comece a Aprender</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Explore os conteúdos, pratique com os visualizadores e domine
              as estruturas de dados avançadas.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/content">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ver Conteúdos
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="https://github.com/anderson-ufrj/AEDIII"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Código Fonte
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

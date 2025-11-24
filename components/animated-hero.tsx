"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const float: any = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="container mx-auto px-4 py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary mb-8 border border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm">
            <Code2 className="h-4 w-4 animate-pulse" />
            IFSULDEMINAS - Ciência da Computação
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Algoritmos e Estruturas de Dados{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent animate-gradient">
            III
          </span>
        </motion.h1>

        <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          Material didático <span className="font-semibold text-foreground">completo</span> sobre estruturas de dados avançadas, algoritmos de busca,
          compressão, criptografia e técnicas de programação.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 justify-center flex-wrap mb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild className="shadow-xl shadow-primary/40 h-12 px-8 text-base font-semibold">
              <Link href="/content">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Conteúdo
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-semibold border-2">
              <Link href="#categories">Ver Categorias</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="flex gap-6 sm:gap-12 justify-center text-center mb-12">
          <div>
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">Tópicos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">40+</div>
            <div className="text-sm text-muted-foreground">Exercícios</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Categorias</div>
          </div>
        </motion.div>

        {/* Floating code symbols */}
        <div className="mt-16 flex justify-center gap-8 text-muted-foreground/30">
          {['{ }', '< >', '[ ]', '( )', '//'].map((symbol, i) => (
            <motion.span
              key={i}
              className="text-4xl font-mono"
              animate={float}
              transition={{ ...float.transition, delay: i * 0.2 }}
            >
              {symbol}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

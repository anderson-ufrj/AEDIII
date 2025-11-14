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
    <section className="container mx-auto px-4 py-20 relative overflow-hidden">
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
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 border border-primary/20">
            <Code2 className="h-4 w-4" />
            IFSULDEMINAS - Ciência da Computação
            <Sparkles className="h-4 w-4" />
          </div>
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Algoritmos e Estruturas de Dados{" "}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            III
          </span>
        </motion.h1>

        <motion.p variants={item} className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Material didático completo sobre estruturas de dados avançadas, algoritmos de busca,
          compressão, criptografia e técnicas de programação.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild className="shadow-lg shadow-primary/30">
              <Link href="/content">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Conteúdo
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" asChild>
              <Link href="#categories">Ver Categorias</Link>
            </Button>
          </motion.div>
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

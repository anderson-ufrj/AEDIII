"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Code2, Sparkles, TreeDeciduous, Database, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Pre-generated particle positions for consistent rendering
const PARTICLES = [
  { id: 0, size: 4.2, left: "12%", top: "8%", delay: 0.3, duration: 5.2 },
  { id: 1, size: 3.1, left: "28%", top: "15%", delay: 1.1, duration: 4.8 },
  { id: 2, size: 5.5, left: "45%", top: "5%", delay: 2.4, duration: 6.1 },
  { id: 3, size: 2.8, left: "67%", top: "12%", delay: 0.8, duration: 4.5 },
  { id: 4, size: 4.0, left: "85%", top: "18%", delay: 3.2, duration: 5.7 },
  { id: 5, size: 3.6, left: "8%", top: "35%", delay: 1.9, duration: 4.3 },
  { id: 6, size: 5.1, left: "22%", top: "42%", delay: 4.1, duration: 6.4 },
  { id: 7, size: 2.5, left: "38%", top: "28%", delay: 0.5, duration: 5.0 },
  { id: 8, size: 4.8, left: "55%", top: "38%", delay: 2.8, duration: 4.6 },
  { id: 9, size: 3.3, left: "72%", top: "32%", delay: 1.5, duration: 5.9 },
  { id: 10, size: 5.8, left: "92%", top: "45%", delay: 3.7, duration: 4.2 },
  { id: 11, size: 2.9, left: "15%", top: "62%", delay: 0.2, duration: 6.0 },
  { id: 12, size: 4.4, left: "32%", top: "75%", delay: 2.1, duration: 5.3 },
  { id: 13, size: 3.7, left: "48%", top: "58%", delay: 4.5, duration: 4.9 },
  { id: 14, size: 5.2, left: "65%", top: "68%", delay: 1.3, duration: 5.5 },
  { id: 15, size: 2.6, left: "82%", top: "72%", delay: 3.0, duration: 6.2 },
  { id: 16, size: 4.6, left: "5%", top: "85%", delay: 0.9, duration: 4.7 },
  { id: 17, size: 3.9, left: "25%", top: "92%", delay: 2.6, duration: 5.1 },
  { id: 18, size: 5.0, left: "58%", top: "88%", delay: 4.0, duration: 4.4 },
  { id: 19, size: 3.2, left: "78%", top: "95%", delay: 1.7, duration: 5.8 },
];

export function AnimatedHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      }
    },
  };

  const features = [
    { icon: TreeDeciduous, label: "Árvores Balanceadas", color: "text-green-500" },
    { icon: Database, label: "Estruturas de Dados", color: "text-blue-500" },
    { icon: Lock, label: "Criptografia", color: "text-purple-500" },
    { icon: Zap, label: "Algoritmos Eficientes", color: "text-orange-500" },
  ];

  return (
    <section className="container mx-auto px-4 py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced Background with Grid Pattern */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-500/10 via-transparent to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30 dark:bg-primary/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Institution Badge */}
        <motion.div variants={item}>
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium mb-8 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30 backdrop-blur-sm shadow-lg shadow-primary/10"
          >
            <Code2 className="h-4 w-4 text-primary" />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-semibold">
              IFSULDEMINAS - Ciência da Computação
            </span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </Badge>
        </motion.div>

        {/* Main Title with Enhanced Gradient */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 relative"
        >
          <span className="relative inline-block">
            Algoritmos e Estruturas de Dados{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                III
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-600/20 to-purple-600/20 blur-xl -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto font-light"
        >
          Material didático completo sobre{" "}
          <span className="text-foreground font-medium">estruturas de dados avançadas</span>,{" "}
          <span className="text-foreground font-medium">algoritmos de busca</span>,{" "}
          compressão, criptografia e técnicas de programação.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex gap-4 justify-center flex-wrap mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              asChild
              className="shadow-2xl shadow-primary/40 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 h-14"
            >
              <Link href="/content">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Conteúdo
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 text-lg px-8 h-14 bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              <Link href="#categories">Ver Categorias</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-background/30 dark:bg-background/20 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors group"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`p-3 rounded-xl bg-gradient-to-br from-background to-muted ${feature.color}`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6" />
              </motion.div>
              <span className="text-sm font-medium text-center leading-tight group-hover:text-primary transition-colors">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Code Symbols - Enhanced */}
        <motion.div
          variants={item}
          className="flex justify-center gap-6 md:gap-12 text-muted-foreground/20 dark:text-muted-foreground/30"
        >
          {["{ }", "< >", "[ ]", "( )", "//", "=>"].map((symbol, i) => (
            <motion.span
              key={i}
              className="text-3xl md:text-5xl font-mono font-bold"
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              whileHover={{
                scale: 1.2,
                opacity: 0.8,
                color: "oklch(var(--primary))",
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Add gradient animation to global styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
}

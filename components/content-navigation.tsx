"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ContentNavigationProps {
  previous: {
    slug: string;
    title: string;
  } | null;
  next: {
    slug: string;
    title: string;
  } | null;
}

export function ContentNavigation({ previous, next }: ContentNavigationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-8 border-t-2">
      {/* Previous */}
      <div>
        {previous ? (
          <Link href={`/content/${previous.slug}`} className="group block">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/30 bg-gradient-to-br from-background to-muted/20 overflow-hidden relative">
              {/* Decoration */}
              <div className="absolute -left-10 -top-10 w-20 h-20 bg-primary/5 rounded-full blur-xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2 group-hover:text-primary transition-colors">
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <span>ANTERIOR</span>
                </div>
                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {previous.title}
                </h3>

                {/* Hover indicator */}
                <div className="mt-3 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Continuar leitura</span>
                  <ChevronLeft className="h-3 w-3 animate-pulse" />
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <div className="h-full opacity-50">
            <Card className="p-6 h-full border-dashed bg-muted/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground/50 mb-2">
                <ChevronLeft className="h-5 w-5" />
                <span>ANTERIOR</span>
              </div>
              <p className="text-muted-foreground/50 text-sm">
                Este é o primeiro conteúdo
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Next */}
      <div>
        {next ? (
          <Link href={`/content/${next.slug}`} className="group block">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/30 bg-gradient-to-br from-background to-muted/20 overflow-hidden relative">
              {/* Decoration */}
              <div className="absolute -right-10 -top-10 w-20 h-20 bg-primary/5 rounded-full blur-xl" />

              <div className="relative">
                <div className="flex items-center justify-end gap-2 text-sm font-semibold text-muted-foreground mb-2 group-hover:text-primary transition-colors">
                  <span>PRÓXIMO</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-lg line-clamp-2 text-right group-hover:text-primary transition-colors">
                  {next.title}
                </h3>

                {/* Hover indicator */}
                <div className="mt-3 flex items-center justify-end gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-3 w-3 animate-pulse" />
                  <span>Continuar leitura</span>
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <div className="h-full opacity-50">
            <Card className="p-6 h-full border-dashed bg-muted/20">
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground/50 mb-2">
                <span>PRÓXIMO</span>
                <ChevronRight className="h-5 w-5" />
              </div>
              <p className="text-muted-foreground/50 text-sm text-right">
                Este é o último conteúdo
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm flex-wrap bg-gradient-to-r from-muted/50 to-transparent p-3 rounded-xl border-2 border-border/50 shadow-sm animate-fade-in">
        <li className="animate-slide-in-right" style={{ animationDelay: '0ms' }}>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 group"
            aria-label="Voltar para início"
          >
            <div className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
              <Home className="h-4 w-4 group-hover:animate-pulse" />
            </div>
            <span className="hidden sm:inline font-medium">Início</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex items-center gap-2 animate-slide-in-right"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-0.5 hover:font-semibold active:scale-95 px-2 py-1 rounded-md hover:bg-primary/5"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`px-2 py-1 rounded-md ${
                    isLast
                      ? "text-foreground font-bold bg-primary/10 border border-primary/20 shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

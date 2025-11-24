"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, FileText, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { getCategoryTheme } from "@/lib/category-config";
import { COURSE_CATEGORIES } from "@/lib/types";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const searchContent = useCallback(async (searchQuery: string, category: string | null = null) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const url = new URL('/api/search', window.location.origin);
      url.searchParams.set('q', searchQuery);
      if (category) {
        url.searchParams.set('category', category);
      }

      const response = await fetch(url.toString());
      const data = await response.json();
      setResults(data.results || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Erro na busca:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchContent(query, selectedCategory);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedCategory, searchContent]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredResults = selectedCategory
    ? results.filter((r) => r.category === selectedCategory)
    : results;

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {isLoading ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors" />
          )}
          <Input
            type="text"
            placeholder="Buscar conteúdo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`pl-10 pr-10 transition-all duration-200 ${
              isLoading ? 'border-primary/50 shadow-sm shadow-primary/20' : ''
            }`}
            onFocus={() => query && setIsOpen(true)}
          />
          {query && !isLoading && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={handleClear}
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant={showFilters || selectedCategory ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0 transition-all duration-200"
          aria-label="Filtrar por categoria"
        >
          <Filter className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Category filters */}
      {showFilters && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg p-3 animate-slide-up border-2">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Badge>
            {COURSE_CATEGORIES.map((cat, index) => {
              const theme = getCategoryTheme(cat.id);
              return (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-all active:scale-95 animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name.split(' ')[0]}
                </Badge>
              );
            })}
          </div>
        </Card>
      )}

      {/* Results dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Results card */}
          <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 shadow-2xl border-2 animate-slide-up">
            {isLoading ? (
              <div className="p-8 flex flex-col items-center gap-3 animate-fade-in">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-medium text-muted-foreground">
                  Buscando conteúdo...
                </p>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="divide-y">
                {filteredResults.map((result, index) => {
                  const theme = getCategoryTheme(result.category);
                  const Icon = theme.icon;

                  return (
                    <Link
                      key={result.slug}
                      href={`/content/${result.slug}`}
                      onClick={handleResultClick}
                      className="block p-4 hover:bg-accent transition-all duration-200 hover:translate-x-1 animate-fade-in group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded ${theme.bgColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
                          <Icon className={`h-4 w-4 ${theme.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h3 className="font-medium text-sm line-clamp-1 flex-1 group-hover:text-primary transition-colors">
                              {result.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
                            {result.excerpt}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {COURSE_CATEGORIES.find((c) => c.id === result.category)?.name || result.category}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 animate-fade-in">
                <EmptyState
                  icon={Search}
                  title="Nenhum resultado encontrado"
                  description={`Não encontramos resultados para "${query}"${selectedCategory ? ' nesta categoria' : ''}`}
                />
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

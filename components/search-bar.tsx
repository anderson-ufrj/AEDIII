"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, FileText, Filter } from "lucide-react";
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar conteúdo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
            onFocus={() => query && setIsOpen(true)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant={showFilters || selectedCategory ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Category filters */}
      {showFilters && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg p-3">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Badge>
            {COURSE_CATEGORIES.map((cat) => {
              const theme = getCategoryTheme(cat.id);
              return (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer"
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
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Results card */}
          <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 shadow-lg">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Buscando...
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="divide-y">
                {filteredResults.map((result) => {
                  const theme = getCategoryTheme(result.category);
                  const Icon = theme.icon;

                  return (
                    <Link
                      key={result.slug}
                      href={`/content/${result.slug}`}
                      onClick={handleResultClick}
                      className="block p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded ${theme.bgColor} flex-shrink-0`}>
                          <Icon className={`h-4 w-4 ${theme.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h3 className="font-medium text-sm line-clamp-1 flex-1">
                              {result.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
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
              <div className="p-6">
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

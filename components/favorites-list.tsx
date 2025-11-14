"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteItem {
  slug: string;
  title: string;
}

interface FavoritesListProps {
  allContent: { slug: string; title: string }[];
}

export function FavoritesList({ allContent }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadFavorites();

    // Listen for favorites updates
    const handleUpdate = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [allContent]);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        const slugs: string[] = JSON.parse(stored);
        const favoriteItems = slugs
          .map((slug) => {
            const content = allContent.find((c) => c.slug === slug);
            return content ? { slug, title: content.title } : null;
          })
          .filter((item): item is FavoriteItem => item !== null);
        setFavorites(favoriteItems);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const removeFavorite = (slug: string) => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        const slugs: string[] = JSON.parse(stored);
        const updated = slugs.filter((s) => s !== slug);
        localStorage.setItem("favorites", JSON.stringify(updated));
        loadFavorites();
        window.dispatchEvent(new Event("favoritesUpdated"));
        toast.info("Removido dos favoritos");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!mounted) return null;

  if (favorites.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum favorito ainda</h3>
          <p className="text-muted-foreground text-sm">
            Marque conteúdos como favoritos para acessá-los rapidamente aqui.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        <h2 className="text-2xl font-bold">Meus Favoritos</h2>
        <span className="text-sm text-muted-foreground">({favorites.length})</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <Card key={favorite.slug} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/content/${favorite.slug}`}
                className="flex items-start gap-3 flex-1 min-w-0"
              >
                <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                    {favorite.title}
                  </h3>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => removeFavorite(favorite.slug)}
                title="Remover dos favoritos"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

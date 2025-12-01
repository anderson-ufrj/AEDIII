"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils/local-storage";

interface FavoriteButtonProps {
  contentSlug: string;
  contentTitle: string;
  variant?: "default" | "icon";
  className?: string;
}

export function FavoriteButton({
  contentSlug,
  contentTitle,
  variant = "default",
  className = "",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load favorite status from localStorage
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(contentSlug));
  }, [contentSlug]);

  const getFavorites = (): string[] => {
    return safeLocalStorageGet<string[]>("favorites", []);
  };

  const saveFavorites = (favorites: string[]) => {
    const success = safeLocalStorageSet("favorites", favorites);
    if (success) {
      // Trigger storage event for other components
      window.dispatchEvent(new Event("favoritesUpdated"));
    } else {
      toast.error("Erro ao salvar favorito");
    }
  };

  const toggleFavorite = () => {
    const favorites = getFavorites();

    if (isFavorite) {
      // Remove from favorites
      const updated = favorites.filter((slug) => slug !== contentSlug);
      saveFavorites(updated);
      setIsFavorite(false);
      toast.info("Removido dos favoritos", {
        description: `"${contentTitle}" foi removido dos favoritos.`,
      });
    } else {
      // Add to favorites
      const updated = [...favorites, contentSlug];
      saveFavorites(updated);
      setIsFavorite(true);
      toast.success("Adicionado aos favoritos!", {
        description: `"${contentTitle}" foi adicionado aos favoritos.`,
      });
    }
  };

  if (!mounted) {
    // Skeleton placeholder to prevent layout shift during hydration
    if (variant === "icon") {
      return (
        <div className={`h-9 w-9 bg-muted rounded-md animate-pulse ${className}`} />
      );
    }
    return (
      <div className={`h-8 w-24 bg-muted rounded-md animate-pulse ${className}`} />
    );
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFavorite}
        className={className}
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Star
          className={`h-5 w-5 transition-all ${
            isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          }`}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={toggleFavorite}
      className={`gap-2 ${className}`}
    >
      <Star
        className={`h-4 w-4 transition-all ${
          isFavorite ? "fill-current" : ""
        }`}
      />
      {isFavorite ? "Favoritado" : "Favoritar"}
    </Button>
  );
}

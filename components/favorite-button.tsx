"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

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
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  };

  const saveFavorites = (favorites: string[]) => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      // Trigger storage event for other components
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (error) {
      console.error("Error saving favorites:", error);
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

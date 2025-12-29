"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ["?"], description: "Abrir este menu de atalhos", category: "Navegação" },
  { keys: ["/"], description: "Focar na busca", category: "Navegação" },
  { keys: ["Esc"], description: "Fechar modais/menus", category: "Navegação" },
  { keys: ["Tab"], description: "Navegar entre elementos", category: "Navegação" },

  // Content
  { keys: ["←", "→"], description: "Navegar entre conteúdos", category: "Conteúdo" },
  { keys: ["j", "k"], description: "Scroll para baixo/cima", category: "Conteúdo" },
  { keys: ["Home"], description: "Ir para o início", category: "Conteúdo" },
  { keys: ["End"], description: "Ir para o final", category: "Conteúdo" },

  // Actions
  { keys: ["Ctrl", "Enter"], description: "Salvar nota", category: "Ações" },
  { keys: ["Ctrl", "S"], description: "Salvar progresso", category: "Ações" },
  { keys: ["Ctrl", "P"], description: "Imprimir página", category: "Ações" },
];

export function KeyboardShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with ? key
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setOpen(true);
        }
      }

      // Close with Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center gap-2"
          title="Atalhos de teclado (?)"
        >
          <Keyboard className="h-4 w-4" />
          <span className="sr-only">Atalhos de teclado</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Atalhos de Teclado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-muted-foreground">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Pressione <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">?</kbd> a qualquer momento para ver este menu
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

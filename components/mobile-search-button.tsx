"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Card } from "@/components/ui/card";

export function MobileSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Search Button - Only on Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir busca"
        >
          <Search className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Search Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 animate-fade-in">
          <Card className="absolute top-0 left-0 right-0 p-4 rounded-none border-b">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchBar />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar busca"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </Card>
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar busca"
          />
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotesPanel } from "@/components/notes-panel";
import { ReadingModeControlsInline } from "@/components/reading-mode-controls-inline";
import { FavoriteButton } from "@/components/favorite-button";
import { ProgressTracker } from "@/components/progress-tracker";
import {
  Settings,
  StickyNote,
  BookOpen,
  Star,
  CheckCircle,
  FileDown,
  ExternalLink,
} from "lucide-react";

interface ContentSidePanelProps {
  contentSlug: string;
  contentTitle: string;
  pdfUrl?: string | null;
  onOpenPDF?: () => void;
  onReadingSettingsChange?: (settings: any) => void;
}

export function ContentSidePanel({
  contentSlug,
  contentTitle,
  pdfUrl,
  onOpenPDF,
  onReadingSettingsChange,
}: ContentSidePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-8 z-40 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        aria-label="Abrir painel de configurações"
        title="Configurações e Ferramentas"
      >
        <Settings className="h-6 w-6" />
      </Button>

      {/* Side Panel */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Painel de Ferramentas</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="tools" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools" className="gap-1">
                <Settings className="h-3 w-3" />
                <span className="hidden sm:inline">Ferramentas</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-1">
                <StickyNote className="h-3 w-3" />
                <span className="hidden sm:inline">Notas</span>
              </TabsTrigger>
              <TabsTrigger value="reading" className="gap-1">
                <BookOpen className="h-3 w-3" />
                <span className="hidden sm:inline">Leitura</span>
              </TabsTrigger>
            </TabsList>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-4 mt-4">
              {/* Progress */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Progresso
                </h3>
                <ProgressTracker
                  contentSlug={contentSlug}
                  contentTitle={contentTitle}
                />
              </div>

              <Separator />

              {/* Favorite */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Favoritos
                </h3>
                <FavoriteButton
                  contentSlug={contentSlug}
                  contentTitle={contentTitle}
                  className="w-full"
                />
              </div>

              {/* PDF Actions */}
              {pdfUrl && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <FileDown className="h-4 w-4" />
                      Material Original
                    </h3>
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          onOpenPDF?.();
                          setOpen(false);
                        }}
                        className="w-full gap-2"
                      >
                        <FileDown className="h-4 w-4" />
                        Abrir PDF com Anotações
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full gap-2"
                      >
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Abrir em Nova Aba
                        </a>
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Info */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Use as abas acima para acessar suas notas e ajustar as
                  configurações de leitura.
                </p>
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-4">
              <NotesPanel
                contentSlug={contentSlug}
                contentTitle={contentTitle}
              />
            </TabsContent>

            {/* Reading Tab */}
            <TabsContent value="reading" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Configurações de Leitura
                  </h3>
                  <ReadingModeControlsInline
                    onSettingsChange={onReadingSettingsChange}
                  />
                </div>
                <Separator />
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Ajuste o tamanho da fonte, espaçamento e largura do
                    conteúdo para uma experiência de leitura mais confortável.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}

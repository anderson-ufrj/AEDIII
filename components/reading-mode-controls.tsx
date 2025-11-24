"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Type,
  Minus,
  Plus,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

interface ReadingModeControlsProps {
  onSettingsChange?: (settings: ReadingSettings) => void;
}

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  maxWidth: "normal" | "wide" | "full";
  isDistractionsMode: boolean;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 16,
  lineHeight: 1.7,
  maxWidth: "normal",
  isDistractionsMode: false,
};

export function ReadingModeControls({ onSettingsChange }: ReadingModeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage
    const stored = localStorage.getItem("reading_settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
        onSettingsChange?.(parsed);
      } catch (error) {
        console.error("Error loading reading settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("reading_settings", JSON.stringify(updated));
    onSettingsChange?.(updated);
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 24) {
      updateSettings({ fontSize: settings.fontSize + 1 });
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 12) {
      updateSettings({ fontSize: settings.fontSize - 1 });
    }
  };

  const increaseLineHeight = () => {
    if (settings.lineHeight < 2.5) {
      updateSettings({ lineHeight: settings.lineHeight + 0.1 });
    }
  };

  const decreaseLineHeight = () => {
    if (settings.lineHeight > 1.2) {
      updateSettings({ lineHeight: settings.lineHeight - 0.1 });
    }
  };

  const toggleDistractionFree = () => {
    updateSettings({ isDistractionsMode: !settings.isDistractionsMode });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("reading_settings");
    onSettingsChange?.(DEFAULT_SETTINGS);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`gap-2 transition-all ${isOpen ? 'bg-primary text-primary-foreground' : ''}`}
        title="Configurações de leitura"
      >
        <Settings className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        <span className="hidden sm:inline">Modo de Leitura</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop with fade */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Settings Panel with slide animation */}
          <Card className="absolute right-0 top-full mt-2 w-80 sm:w-96 p-5 z-50 shadow-2xl border-2 animate-slide-up">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Type className="h-5 w-5 text-primary" />
                  </div>
                  Modo de Leitura
                </h3>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-sm font-semibold mb-2 flex items-center justify-between">
                  <span>Tamanho da Fonte</span>
                  <span className="text-primary font-bold">{settings.fontSize}px</span>
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={decreaseFontSize}
                    disabled={settings.fontSize <= 12}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 rounded-full"
                      style={{
                        width: `${((settings.fontSize - 12) / (24 - 12)) * 100}%`,
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={increaseFontSize}
                    disabled={settings.fontSize >= 24}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <label className="text-sm font-semibold mb-2 flex items-center justify-between">
                  <span>Espaçamento entre Linhas</span>
                  <span className="text-primary font-bold">{settings.lineHeight.toFixed(1)}</span>
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={decreaseLineHeight}
                    disabled={settings.lineHeight <= 1.2}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 rounded-full"
                      style={{
                        width: `${((settings.lineHeight - 1.2) / (2.5 - 1.2)) * 100}%`,
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={increaseLineHeight}
                    disabled={settings.lineHeight >= 2.5}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>Compacto</span>
                  <span>Espaçado</span>
                </div>
              </div>

              {/* Content Width */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Largura do Conteúdo
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={settings.maxWidth === "normal" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ maxWidth: "normal" })}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <AlignCenter className="h-4 w-4" />
                    <span className="text-xs">Normal</span>
                  </Button>
                  <Button
                    variant={settings.maxWidth === "wide" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ maxWidth: "wide" })}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <AlignLeft className="h-4 w-4" />
                    <span className="text-xs">Largo</span>
                  </Button>
                  <Button
                    variant={settings.maxWidth === "full" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings({ maxWidth: "full" })}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <Maximize2 className="h-4 w-4" />
                    <span className="text-xs">Completo</span>
                  </Button>
                </div>
              </div>

              {/* Distraction Free Mode */}
              <div className="pt-2 border-t">
                <Button
                  variant={settings.isDistractionsMode ? "default" : "outline"}
                  size="lg"
                  onClick={toggleDistractionFree}
                  className="w-full gap-2 font-semibold"
                >
                  {settings.isDistractionsMode ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                  {settings.isDistractionsMode
                    ? "Sair do Modo Foco"
                    : "Ativar Modo Foco"}
                </Button>
                {settings.isDistractionsMode && (
                  <p className="text-xs text-muted-foreground mt-2 text-center animate-fade-in">
                    Sidebars ocultas para melhor concentração
                  </p>
                )}
              </div>

              {/* Reset */}
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSettings}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Restaurar Configurações Padrão
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Type,
  Minus,
  Plus,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

interface ReadingModeControlsInlineProps {
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

export function ReadingModeControlsInline({ onSettingsChange }: ReadingModeControlsInlineProps) {
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

  if (!mounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div>
          <div className="h-4 w-32 bg-muted rounded mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-muted rounded" />
            <div className="flex-1 h-2 bg-muted rounded-full" />
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
        </div>
        <div>
          <div className="h-4 w-28 bg-muted rounded mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-muted rounded" />
            <div className="flex-1 h-2 bg-muted rounded-full" />
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
        </div>
        <div>
          <div className="h-4 w-36 bg-muted rounded mb-2" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Tamanho da Fonte: {settings.fontSize}px
        </label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseFontSize}
            disabled={settings.fontSize <= 12}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${((settings.fontSize - 12) / (24 - 12)) * 100}%`,
              }}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={increaseFontSize}
            disabled={settings.fontSize >= 24}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Line Height */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Espaçamento: {settings.lineHeight.toFixed(1)}
        </label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseLineHeight}
            disabled={settings.lineHeight <= 1.2}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${((settings.lineHeight - 1.2) / (2.5 - 1.2)) * 100}%`,
              }}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={increaseLineHeight}
            disabled={settings.lineHeight >= 2.5}
          >
            <Plus className="h-4 w-4" />
          </Button>
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
      <div>
        <Button
          variant={settings.isDistractionsMode ? "default" : "outline"}
          size="sm"
          onClick={toggleDistractionFree}
          className="w-full gap-2"
        >
          {settings.isDistractionsMode ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
          {settings.isDistractionsMode
            ? "Sair do Modo Sem Distrações"
            : "Modo Sem Distrações"}
        </Button>
      </div>

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        onClick={resetSettings}
        className="w-full"
      >
        Restaurar Padrões
      </Button>
    </div>
  );
}

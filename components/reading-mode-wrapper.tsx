"use client";

import { useState, useEffect, ReactNode } from "react";
import { ReadingModeControls, ReadingSettings } from "./reading-mode-controls";

interface ReadingModeWrapperProps {
  children: ReactNode;
  showControls?: boolean;
}

export function ReadingModeWrapper({ children, showControls = true }: ReadingModeWrapperProps) {
  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    lineHeight: 1.7,
    maxWidth: "normal",
    isDistractionsMode: false,
  });

  useEffect(() => {
    // Load settings from localStorage
    const stored = localStorage.getItem("reading_settings");
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading reading settings:", error);
      }
    }
  }, []);

  const getMaxWidthClass = () => {
    switch (settings.maxWidth) {
      case "normal":
        return "max-w-4xl";
      case "wide":
        return "max-w-6xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-4xl";
    }
  };

  return (
    <div>
      {showControls && (
        <div className={`mb-4 flex justify-end ${settings.isDistractionsMode ? 'hidden' : ''}`}>
          <ReadingModeControls onSettingsChange={setSettings} />
        </div>
      )}
      <div
        className={`transition-all duration-300 ${getMaxWidthClass()} ${
          settings.isDistractionsMode ? 'mx-auto' : ''
        }`}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
        }}
      >
        {children}
      </div>
    </div>
  );
}

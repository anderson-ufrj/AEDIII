"use client";

import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProgressTrackerProps {
  contentSlug: string;
  contentTitle: string;
}

export function ProgressTracker({ contentSlug, contentTitle }: ProgressTrackerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load completion status from localStorage
    const completed = localStorage.getItem(`content_completed_${contentSlug}`) === "true";
    setIsCompleted(completed);
  }, [contentSlug]);

  const toggleCompletion = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(`content_completed_${contentSlug}`, String(newStatus));

    // Trigger storage event for other components
    window.dispatchEvent(new Event("progressUpdated"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isCompleted ? (
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
              <Circle className="h-4 w-4 text-muted-foreground/30" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium">
              {isCompleted ? "Conteúdo concluído!" : "Marcar como concluído"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isCompleted
                ? "Você já estudou este conteúdo"
                : "Marque quando finalizar a leitura"}
            </p>
          </div>
        </div>
        <Button
          variant={isCompleted ? "outline" : "default"}
          onClick={toggleCompletion}
          className="gap-2"
        >
          {isCompleted ? (
            <>
              <Circle className="h-4 w-4" />
              Desmarcar
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Concluir
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

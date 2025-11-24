"use client";

import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

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

    // Show toast notification
    if (newStatus) {
      toast.success("Conteúdo concluído!", {
        description: `"${contentTitle}" foi marcado como concluído.`,
      });
    } else {
      toast.info("Conteúdo desmarcado", {
        description: `"${contentTitle}" foi desmarcado.`,
      });
    }

    // Trigger storage event for other components
    window.dispatchEvent(new Event("progressUpdated"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className={`p-5 mb-6 transition-all duration-300 hover:shadow-md ${
      isCompleted
        ? "bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border-green-200 dark:border-green-800"
        : "bg-gradient-to-br from-background to-muted/20 hover:border-primary/30"
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {isCompleted ? (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md animate-scale-in ring-2 ring-green-300 dark:ring-green-700">
              <Check className="h-6 w-6 text-white font-bold" strokeWidth={3} />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center hover:border-primary/60 transition-colors">
              <Circle className="h-5 w-5 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold mb-0.5">
              {isCompleted ? "✅ Conteúdo concluído!" : "Marcar como concluído"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isCompleted
                ? "Você já estudou este conteúdo. Ótimo trabalho!"
                : "Marque quando finalizar a leitura deste material"}
            </p>
          </div>
        </div>
        <Button
          variant={isCompleted ? "outline" : "default"}
          onClick={toggleCompletion}
          className={`gap-2 font-medium transition-all hover:scale-105 ${
            isCompleted
              ? "hover:bg-muted"
              : "shadow-md hover:shadow-lg"
          }`}
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

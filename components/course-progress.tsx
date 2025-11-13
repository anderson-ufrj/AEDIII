"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface CourseProgressProps {
  totalContent: number;
  allSlugs: string[];
}

export function CourseProgress({ totalContent, allSlugs }: CourseProgressProps) {
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);

  const updateProgress = () => {
    let count = 0;
    allSlugs.forEach((slug) => {
      if (localStorage.getItem(`content_completed_${slug}`) === "true") {
        count++;
      }
    });
    setCompleted(count);
  };

  useEffect(() => {
    setMounted(true);
    updateProgress();

    // Listen for progress updates
    const handleProgressUpdate = () => updateProgress();
    window.addEventListener("progressUpdated", handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);

    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);
    };
  }, [allSlugs]);

  if (!mounted) {
    return null;
  }

  const percentage = totalContent > 0 ? Math.round((completed / totalContent) * 100) : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Seu Progresso no Curso</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {completed} de {totalContent} conteúdos concluídos
          </p>

          {/* Progress bar */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{percentage}% completo</span>
            {completed === totalContent && totalContent > 0 && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                <span className="font-medium">Curso concluído!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

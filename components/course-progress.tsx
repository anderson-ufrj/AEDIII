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
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="flex items-start gap-4 relative">
        <div className="p-3 rounded-xl bg-primary/10 ring-2 ring-primary/20 group-hover:ring-primary/30 transition-all">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Seu Progresso no Curso</h3>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">{completed}</span> de{" "}
            <span className="font-semibold text-foreground">{totalContent}</span> conteúdos concluídos
          </p>

          {/* Enhanced Progress bar with segments */}
          <div className="relative">
            <div className="relative h-3 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${percentage}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Percentage badge */}
            <div className="absolute -top-1 right-0 transform translate-y-0">
              <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md shadow-md">
                {percentage}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs font-medium text-muted-foreground">
              {percentage === 0 && "Comece sua jornada! 🚀"}
              {percentage > 0 && percentage < 30 && "Ótimo começo! 💪"}
              {percentage >= 30 && percentage < 60 && "Você está indo bem! 🔥"}
              {percentage >= 60 && percentage < 100 && "Quase lá! 🎯"}
            </span>
            {completed === totalContent && totalContent > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 font-semibold animate-scale-in">
                <CheckCircle2 className="h-4 w-4" />
                <span>Parabéns! 🎉</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

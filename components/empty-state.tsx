"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Icon container with animation */}
      <div className="relative mb-6 animate-scale-in" style={{ animationDelay: "100ms" }}>
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="relative rounded-full bg-gradient-to-br from-muted to-muted/50 p-6 border-2 border-border/50 shadow-lg">
          <Icon className="h-12 w-12 text-primary" />
        </div>
      </div>

      {/* Text content with stagger */}
      <div className="space-y-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action with delay */}
      {action && (
        <div className="mt-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          {action}
        </div>
      )}
    </div>
  );
}

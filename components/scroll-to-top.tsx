"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / windowHeight) * 100;

      setScrollProgress(progress);

      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Initial call

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-scale-in">
      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90" width="56" height="56">
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-muted"
          opacity="0.2"
        />
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-primary transition-all duration-300"
          strokeDasharray={`${2 * Math.PI * 24}`}
          strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
          strokeLinecap="round"
        />
      </svg>

      {/* Button */}
      <Button
        onClick={scrollToTop}
        className="h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 relative"
        size="icon"
        aria-label="Voltar ao topo"
        title={`Voltar ao topo (${Math.round(scrollProgress)}% lido)`}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}

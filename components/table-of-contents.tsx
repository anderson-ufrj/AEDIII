"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract all headings from the page
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4")
    ).slice(1); // Skip the first h1 (page title)

    const headingData: Heading[] = elements.map((element, index) => {
      const id = element.id || `heading-${index}`;
      if (!element.id) {
        element.id = id;
      }

      return {
        id,
        text: element.textContent || "",
        level: parseInt(element.tagName.substring(1)),
      };
    });

    setHeadings(headingData);

    // Intersection Observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const progress = headings.length > 0
    ? ((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100
    : 0;

  return (
    <Card className="p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto shadow-lg border-2 animate-fade-in bg-gradient-to-br from-background to-muted/10">
      {/* Header with progress */}
      <div className="mb-4 pb-3 border-b-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <List className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-bold text-sm">Neste Artigo</h3>
          </div>
          <span className="text-xs font-semibold text-primary">
            {headings.findIndex(h => h.id === activeId) + 1}/{headings.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <nav>
        <ul className="space-y-0.5 text-sm">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${(heading.level - 1) * 12}px`,
                  animationDelay: `${index * 30}ms`
                }}
                className="animate-fade-in"
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`
                    text-left w-full py-2 px-3 rounded-lg transition-all duration-200
                    hover:bg-accent hover:text-accent-foreground hover:translate-x-1
                    relative group
                    ${
                      isActive
                        ? "text-primary font-semibold bg-primary/10 border-l-2 border-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full animate-scale-in" />
                  )}
                  <span className={`block ${isActive ? 'ml-2' : ''}`}>
                    {heading.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t text-xs text-muted-foreground text-center">
        Clique para navegar
      </div>
    </Card>
  );
}

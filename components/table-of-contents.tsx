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

  return (
    <Card className="p-4 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b">
        <List className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Neste artigo</h3>
      </div>

      <nav>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  text-left w-full py-1 px-2 rounded transition-colors
                  hover:bg-accent hover:text-accent-foreground
                  ${
                    activeId === heading.id
                      ? "text-primary font-medium bg-accent"
                      : "text-muted-foreground"
                  }
                `}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
}

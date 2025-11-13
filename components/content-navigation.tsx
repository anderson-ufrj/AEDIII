"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ContentNavigationProps {
  previous: {
    slug: string;
    title: string;
  } | null;
  next: {
    slug: string;
    title: string;
  } | null;
}

export function ContentNavigation({ previous, next }: ContentNavigationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t">
      {/* Previous */}
      <div>
        {previous ? (
          <Link href={`/content/${previous.slug}`}>
            <Card className="p-4 hover:bg-accent transition-colors cursor-pointer h-full">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </div>
              <h3 className="font-medium line-clamp-2">{previous.title}</h3>
            </Card>
          </Link>
        ) : (
          <div className="h-full" />
        )}
      </div>

      {/* Next */}
      <div>
        {next ? (
          <Link href={`/content/${next.slug}`}>
            <Card className="p-4 hover:bg-accent transition-colors cursor-pointer h-full">
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
                <span>Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <h3 className="font-medium line-clamp-2 text-right">{next.title}</h3>
            </Card>
          </Link>
        ) : (
          <div className="h-full" />
        )}
      </div>
    </div>
  );
}

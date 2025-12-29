"use client";

import { useMemo } from "react";

interface ReadingTimeResult {
  text: string;
  minutes: number;
  words: number;
  time: number; // milliseconds
}

const WORDS_PER_MINUTE = 200; // Average reading speed in Portuguese

/**
 * Calculate estimated reading time for content
 *
 * @param content - The text content to analyze
 * @returns Reading time estimation
 *
 * @example
 * ```tsx
 * const { text, minutes } = useReadingTime(markdownContent);
 * // text: "5 min de leitura"
 * // minutes: 5
 * ```
 */
export function useReadingTime(content: string | undefined): ReadingTimeResult {
  return useMemo(() => {
    if (!content) {
      return {
        text: "< 1 min de leitura",
        minutes: 0,
        words: 0,
        time: 0,
      };
    }

    // Remove markdown syntax, code blocks, and HTML tags
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/`[^`]+`/g, "") // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Keep link text
      .replace(/#{1,6}\s/g, "") // Remove heading markers
      .replace(/[*_~]+/g, "") // Remove formatting
      .replace(/<[^>]+>/g, "") // Remove HTML tags
      .replace(/\n+/g, " ") // Normalize whitespace
      .trim();

    // Count words (split by whitespace)
    const words = cleanContent.split(/\s+/).filter((word) => word.length > 0).length;

    // Calculate reading time
    const minutes = Math.ceil(words / WORDS_PER_MINUTE);
    const time = (words / WORDS_PER_MINUTE) * 60 * 1000; // Convert to milliseconds

    // Format text
    let text: string;
    if (minutes < 1) {
      text = "< 1 min de leitura";
    } else if (minutes === 1) {
      text = "1 min de leitura";
    } else {
      text = `${minutes} min de leitura`;
    }

    return {
      text,
      minutes,
      words,
      time,
    };
  }, [content]);
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes === 1) return "1 min";
  return `${minutes} min`;
}

/**
 * Get reading time category for badges
 */
export function getReadingTimeCategory(
  minutes: number
): "quick" | "medium" | "long" {
  if (minutes <= 5) return "quick";
  if (minutes <= 15) return "medium";
  return "long";
}

/**
 * Get category label in Portuguese
 */
export function getReadingTimeCategoryLabel(
  category: "quick" | "medium" | "long"
): string {
  const labels = {
    quick: "Leitura rápida",
    medium: "Leitura média",
    long: "Leitura longa",
  };
  return labels[category];
}

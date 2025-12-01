import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CourseContent, CONTENT_MAPPING } from './types';

const contentDirectory = path.join(process.cwd(), 'lib/content');

// Cache for memoization - avoids repeated file system reads
let cachedContent: CourseContent[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 60000; // 1 minute TTL for development, effectively permanent in production

function isCacheValid(): boolean {
  if (!cachedContent) return false;
  // In production, cache is always valid once populated
  if (process.env.NODE_ENV === 'production') return true;
  // In development, check TTL for hot reload support
  return Date.now() - cacheTimestamp < CACHE_TTL;
}

function loadContentFromDisk(): CourseContent[] {
  const fileNames = fs.readdirSync(contentDirectory);

  const allContent = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
    .map((fileName): CourseContent | null => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      const mapping = CONTENT_MAPPING[slug];

      if (!mapping) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`No mapping found for: ${slug}`);
        }
        return null;
      }

      return {
        slug,
        title: mapping.title || data.title || slug,
        author: data.author || 'IFSULDEMINAS',
        pages: data.pages || 0,
        source: data.source || fileName,
        content,
        category: mapping.category,
        order: mapping.order,
      };
    })
    .filter((item): item is CourseContent => item !== null);

  return allContent.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.order - b.order;
  });
}

export function getAllContent(): CourseContent[] {
  if (isCacheValid()) {
    return cachedContent!;
  }

  cachedContent = loadContentFromDisk();
  cacheTimestamp = Date.now();
  return cachedContent;
}

export function invalidateContentCache(): void {
  cachedContent = null;
  cacheTimestamp = 0;
}

export function getContentBySlug(slug: string): CourseContent | null {
  const allContent = getAllContent();
  return allContent.find((content) => content.slug === slug) || null;
}

export function getContentByCategory(category: string): CourseContent[] {
  const allContent = getAllContent();
  return allContent.filter((content) => content.category === category);
}

export function getAllSlugs(): string[] {
  const allContent = getAllContent();
  return allContent.map((content) => content.slug);
}

export function getAdjacentContent(slug: string): {
  previous: CourseContent | null;
  next: CourseContent | null;
} {
  const allContent = getAllContent();
  const currentIndex = allContent.findIndex((content) => content.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allContent[currentIndex - 1] : null,
    next: currentIndex < allContent.length - 1 ? allContent[currentIndex + 1] : null,
  };
}

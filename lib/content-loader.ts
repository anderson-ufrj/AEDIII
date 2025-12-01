/**
 * Content Loader Module
 *
 * This module provides functions to load and manage course content from Markdown files.
 * It implements a caching strategy to minimize file system reads and improve performance.
 *
 * @module content-loader
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CourseContent, CONTENT_MAPPING } from './types';

/** Directory containing all markdown content files */
const contentDirectory = path.join(process.cwd(), 'lib/content');

// Cache for memoization - avoids repeated file system reads
let cachedContent: CourseContent[] | null = null;
let cacheTimestamp: number = 0;

/** Cache time-to-live in milliseconds (1 minute for development) */
const CACHE_TTL = 60000;

/**
 * Checks if the current cache is valid and can be used.
 * In production, cache is permanent once populated.
 * In development, cache expires after CACHE_TTL for hot reload support.
 *
 * @returns {boolean} True if cache is valid and can be used
 */
function isCacheValid(): boolean {
  if (!cachedContent) return false;
  if (process.env.NODE_ENV === 'production') return true;
  return Date.now() - cacheTimestamp < CACHE_TTL;
}

/**
 * Loads all content from disk, parsing Markdown files with frontmatter.
 * This is an internal function called when cache is invalid.
 *
 * @returns {CourseContent[]} Array of parsed course content sorted by category and order
 */
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

/**
 * Retrieves all course content with caching.
 * Results are cached to avoid repeated file system reads.
 *
 * @returns {CourseContent[]} Array of all course content sorted by category and order
 * @example
 * const allContent = getAllContent();
 * console.log(`Found ${allContent.length} content items`);
 */
export function getAllContent(): CourseContent[] {
  if (isCacheValid()) {
    return cachedContent!;
  }

  cachedContent = loadContentFromDisk();
  cacheTimestamp = Date.now();
  return cachedContent;
}

/**
 * Invalidates the content cache, forcing a reload on next access.
 * Useful for development hot reload or when content files change.
 *
 * @example
 * invalidateContentCache();
 * const freshContent = getAllContent(); // Will reload from disk
 */
export function invalidateContentCache(): void {
  cachedContent = null;
  cacheTimestamp = 0;
}

/**
 * Retrieves a single content item by its slug.
 *
 * @param {string} slug - The URL slug of the content (filename without .md extension)
 * @returns {CourseContent | null} The content item or null if not found
 * @example
 * const content = getContentBySlug('arvore-b');
 * if (content) {
 *   console.log(content.title);
 * }
 */
export function getContentBySlug(slug: string): CourseContent | null {
  const allContent = getAllContent();
  return allContent.find((content) => content.slug === slug) || null;
}

/**
 * Retrieves all content items belonging to a specific category.
 *
 * @param {string} category - The category identifier (e.g., 'arvores', 'hash', 'compressao')
 * @returns {CourseContent[]} Array of content items in the specified category
 * @example
 * const treeContent = getContentByCategory('arvores');
 */
export function getContentByCategory(category: string): CourseContent[] {
  const allContent = getAllContent();
  return allContent.filter((content) => content.category === category);
}

/**
 * Retrieves all content slugs for static page generation.
 *
 * @returns {string[]} Array of all content slugs
 * @example
 * // In generateStaticParams
 * const slugs = getAllSlugs();
 * return slugs.map(slug => ({ slug }));
 */
export function getAllSlugs(): string[] {
  const allContent = getAllContent();
  return allContent.map((content) => content.slug);
}

/**
 * Retrieves the previous and next content items relative to a given slug.
 * Useful for navigation between content pages.
 *
 * @param {string} slug - The current content slug
 * @returns {{ previous: CourseContent | null, next: CourseContent | null }} Adjacent content items
 * @example
 * const { previous, next } = getAdjacentContent('arvore-b');
 * if (next) {
 *   console.log(`Next topic: ${next.title}`);
 * }
 */
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

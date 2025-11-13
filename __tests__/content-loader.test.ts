import { describe, it, expect } from 'vitest';
import { getAllContent, getContentBySlug, getAllSlugs } from '@/lib/content-loader';

describe('Content Loader', () => {
  describe('getAllContent', () => {
    it('should return an array of content', () => {
      const content = getAllContent();
      expect(Array.isArray(content)).toBe(true);
    });

    it('should return content with required properties', () => {
      const content = getAllContent();
      if (content.length > 0) {
        const firstItem = content[0];
        expect(firstItem).toHaveProperty('slug');
        expect(firstItem).toHaveProperty('title');
        expect(firstItem).toHaveProperty('content');
        expect(firstItem).toHaveProperty('category');
        expect(firstItem).toHaveProperty('order');
      }
    });

    it('should return sorted content', () => {
      const content = getAllContent();
      if (content.length > 1) {
        for (let i = 0; i < content.length - 1; i++) {
          if (content[i].category === content[i + 1].category) {
            expect(content[i].order).toBeLessThanOrEqual(content[i + 1].order);
          }
        }
      }
    });
  });

  describe('getContentBySlug', () => {
    it('should return null for non-existent slug', () => {
      const content = getContentBySlug('non-existent-slug-12345');
      expect(content).toBeNull();
    });

    it('should return content for valid slug', () => {
      const allContent = getAllContent();
      if (allContent.length > 0) {
        const firstSlug = allContent[0].slug;
        const content = getContentBySlug(firstSlug);
        expect(content).not.toBeNull();
        expect(content?.slug).toBe(firstSlug);
      }
    });
  });

  describe('getAllSlugs', () => {
    it('should return an array of strings', () => {
      const slugs = getAllSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      slugs.forEach((slug) => {
        expect(typeof slug).toBe('string');
      });
    });

    it('should match the number of all content', () => {
      const content = getAllContent();
      const slugs = getAllSlugs();
      expect(slugs.length).toBe(content.length);
    });
  });
});

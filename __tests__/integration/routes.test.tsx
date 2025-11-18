import { describe, it, expect } from 'vitest';
import { getAllSlugs, getContentBySlug } from '@/lib/content-loader';
import { CONTENT_MAPPING, COURSE_CATEGORIES } from '@/lib/types';

describe('Testes de Integração - Rotas', () => {
  describe('Carregamento de Conteúdo', () => {
    it('deve carregar todos os slugs corretamente', () => {
      const slugs = getAllSlugs();
      expect(slugs).toBeDefined();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
    });

    it('todos os slugs devem ter mapeamento em CONTENT_MAPPING', () => {
      const slugs = getAllSlugs();

      slugs.forEach((slug) => {
        expect(CONTENT_MAPPING[slug]).toBeDefined();
        expect(CONTENT_MAPPING[slug]).toHaveProperty('category');
        expect(CONTENT_MAPPING[slug]).toHaveProperty('order');
        expect(CONTENT_MAPPING[slug]).toHaveProperty('title');
      });
    });

    it('deve carregar conteúdo válido para cada slug', () => {
      const slugs = getAllSlugs();

      slugs.forEach((slug) => {
        const content = getContentBySlug(slug);

        expect(content).toBeDefined();
        expect(content?.slug).toBe(slug);
        expect(content?.title).toBeDefined();
        expect(content?.content).toBeDefined();
        expect(content?.category).toBeDefined();
      });
    });
  });

  describe('Categorias do Curso', () => {
    it('deve ter todas as 6 categorias definidas', () => {
      expect(COURSE_CATEGORIES).toHaveLength(6);
    });

    it('cada categoria deve ter estrutura válida', () => {
      COURSE_CATEGORIES.forEach((category) => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('order');
      });
    });

    it('categorias devem estar em ordem crescente', () => {
      for (let i = 0; i < COURSE_CATEGORIES.length - 1; i++) {
        expect(COURSE_CATEGORIES[i].order).toBeLessThan(COURSE_CATEGORIES[i + 1].order);
      }
    });

    it('IDs de categorias devem ser únicos', () => {
      const ids = COURSE_CATEGORIES.map(cat => cat.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(COURSE_CATEGORIES.length);
    });
  });

  describe('Integridade do Mapeamento', () => {
    it('todos os conteúdos devem pertencer a categorias válidas', () => {
      const validCategories = COURSE_CATEGORIES.map(cat => cat.id);

      Object.values(CONTENT_MAPPING).forEach((mapping) => {
        expect(validCategories).toContain(mapping.category);
      });
    });

    it('cada categoria deve ter pelo menos um conteúdo', () => {
      const validCategories = COURSE_CATEGORIES.map(cat => cat.id);
      const usedCategories = new Set(
        Object.values(CONTENT_MAPPING).map(m => m.category)
      );

      validCategories.forEach((catId) => {
        expect(usedCategories.has(catId)).toBe(true);
      });
    });

    it('ordem dos conteúdos dentro de cada categoria deve ser sequencial', () => {
      const categoriesContent: Record<string, number[]> = {};

      Object.values(CONTENT_MAPPING).forEach((mapping) => {
        if (!categoriesContent[mapping.category]) {
          categoriesContent[mapping.category] = [];
        }
        categoriesContent[mapping.category].push(mapping.order);
      });

      Object.values(categoriesContent).forEach((orders) => {
        const sortedOrders = [...orders].sort((a, b) => a - b);
        expect(orders.sort((a, b) => a - b)).toEqual(sortedOrders);
      });
    });
  });
});

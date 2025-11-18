/**
 * @fileoverview Carregador de conteúdo do curso AED III
 * Responsável por carregar e processar arquivos Markdown com frontmatter
 * @module lib/content-loader
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CourseContent, CONTENT_MAPPING } from './types';

/**
 * Diretório onde os arquivos de conteúdo Markdown estão armazenados
 * @constant
 * @type {string}
 */
const CONTENT_DIR = path.join(process.cwd(), 'lib', 'content');

/**
 * Carrega todos os conteúdos do curso disponíveis
 *
 * @returns {CourseContent[]} Array com todos os conteúdos ordenados
 *
 * @example
 * ```typescript
 * const conteudos = getAllContent();
 * console.log(conteudos.length); // 19
 * ```
 *
 * @throws {Error} Se o diretório de conteúdo não existir
 *
 * @remarks
 * - Lê todos os arquivos .md do diretório lib/content
 * - Processa frontmatter de cada arquivo
 * - Ignora arquivo README.md
 * - Ordena por categoria e ordem definida em CONTENT_MAPPING
 * - Retorna array vazio se nenhum arquivo for encontrado
 */
export function getAllContent(): CourseContent[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);

    const contents = files
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .map((file) => {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const slug = file.replace(/\.md$/, '');
        const mapping = CONTENT_MAPPING[slug];

        if (!mapping) {
          console.warn(`Aviso: Slug "${slug}" não encontrado em CONTENT_MAPPING`);
        }

        return {
          slug,
          title: data.title || mapping?.title || slug,
          author: data.author || 'IFSULDEMINAS',
          pages: data.pages || 0,
          source: data.source || '',
          content,
          category: mapping?.category || 'geral',
          order: mapping?.order || 999,
        };
      });

    // Ordena por categoria e depois por ordem
    return contents.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });
  } catch (error) {
    console.error('Erro ao carregar conteúdos:', error);
    return [];
  }
}

/**
 * Carrega um conteúdo específico por seu slug
 *
 * @param {string} slug - Identificador único do conteúdo
 * @returns {CourseContent | null} Conteúdo encontrado ou null
 *
 * @example
 * ```typescript
 * const avl = getContentBySlug('001_-_AVL');
 * if (avl) {
 *   console.log(avl.title); // "Árvores AVL"
 * }
 * ```
 *
 * @remarks
 * - Retorna null se o arquivo não existir
 * - Processa frontmatter YAML do arquivo
 * - Busca metadados em CONTENT_MAPPING
 * - Usa valores padrão se frontmatter estiver incompleto
 */
export function getContentBySlug(slug: string): CourseContent | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      console.warn(`Arquivo não encontrado: ${slug}.md`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const mapping = CONTENT_MAPPING[slug];

    return {
      slug,
      title: data.title || mapping?.title || slug,
      author: data.author || 'IFSULDEMINAS',
      pages: data.pages || 0,
      source: data.source || '',
      content,
      category: mapping?.category || 'geral',
      order: mapping?.order || 999,
    };
  } catch (error) {
    console.error(`Erro ao carregar conteúdo "${slug}":`, error);
    return null;
  }
}

/**
 * Obtém todos os slugs de conteúdo disponíveis
 *
 * @returns {string[]} Array de slugs
 *
 * @example
 * ```typescript
 * const slugs = getAllSlugs();
 * // ['001_-_AVL', '002_-_AVL-Implementacao', ...]
 * ```
 *
 * @remarks
 * - Usado pelo Next.js para gerar páginas estáticas
 * - Ignora README.md
 * - Remove extensão .md dos nomes de arquivo
 * - Retorna array vazio se diretório não existir
 */
export function getAllSlugs(): string[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .map((file) => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Erro ao listar slugs:', error);
    return [];
  }
}

/**
 * Obtém conteúdos adjacentes (anterior e próximo) na ordem de leitura
 *
 * @param {string} currentSlug - Slug do conteúdo atual
 * @returns {{previous: CourseContent | null, next: CourseContent | null}}
 *
 * @example
 * ```typescript
 * const { previous, next } = getAdjacentContent('001_-_AVL');
 * if (previous) console.log(`Anterior: ${previous.title}`);
 * if (next) console.log(`Próximo: ${next.title}`);
 * ```
 *
 * @remarks
 * - Retorna null para `previous` se for o primeiro conteúdo
 * - Retorna null para `next` se for o último conteúdo
 * - Considera ordem global (não apenas dentro da categoria)
 * - Útil para navegação entre conteúdos
 */
export function getAdjacentContent(currentSlug: string): {
  previous: CourseContent | null;
  next: CourseContent | null;
} {
  const allContents = getAllContent();
  const currentIndex = allContents.findIndex((c) => c.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allContents[currentIndex - 1] : null,
    next: currentIndex < allContents.length - 1 ? allContents[currentIndex + 1] : null,
  };
}

/**
 * Filtra conteúdos por categoria
 *
 * @param {string} category - ID da categoria
 * @returns {CourseContent[]} Conteúdos da categoria ordenados
 *
 * @example
 * ```typescript
 * const arvores = getContentsByCategory('arvores');
 * console.log(arvores.length); // 5 (AVL, RBT, Splay, B-Tree, etc.)
 * ```
 *
 * @remarks
 * - Retorna array vazio se categoria não existir
 * - Conteúdos já vêm ordenados pelo campo `order`
 * - Case-sensitive (use IDs exatos: 'arvores', 'hash', etc.)
 */
export function getContentsByCategory(category: string): CourseContent[] {
  const allContents = getAllContent();
  return allContents.filter((content) => content.category === category);
}

/**
 * Busca conteúdos por termo de pesquisa
 *
 * @param {string} query - Termo de busca
 * @param {Object} options - Opções de busca
 * @param {string} [options.category] - Filtrar por categoria
 * @param {number} [options.limit=10] - Limite de resultados
 * @returns {Array<{content: CourseContent, excerpt: string}>} Resultados com trechos
 *
 * @example
 * ```typescript
 * const resultados = searchContent('balanceamento', {
 *   category: 'arvores',
 *   limit: 5
 * });
 *
 * resultados.forEach(({ content, excerpt }) => {
 *   console.log(content.title);
 *   console.log(excerpt); // Trecho com o termo encontrado
 * });
 * ```
 *
 * @remarks
 * - Busca case-insensitive
 * - Busca em título e conteúdo
 * - Retorna trecho de ~200 caracteres ao redor do termo
 * - Ordenado por relevância (título > conteúdo)
 */
export function searchContent(
  query: string,
  options: { category?: string; limit?: number } = {}
): Array<{ content: CourseContent; excerpt: string }> {
  const { category, limit = 10 } = options;
  const allContents = getAllContent();

  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return [];

  let results = allContents
    .map((content) => {
      const titleMatch = content.title.toLowerCase().includes(searchTerm);
      const contentMatch = content.content.toLowerCase().includes(searchTerm);

      if (!titleMatch && !contentMatch) return null;

      // Extrai trecho ao redor do termo encontrado
      let excerpt = '';
      if (contentMatch) {
        const index = content.content.toLowerCase().indexOf(searchTerm);
        const start = Math.max(0, index - 100);
        const end = Math.min(content.content.length, index + 100);
        excerpt = '...' + content.content.substring(start, end) + '...';
      } else {
        excerpt = content.content.substring(0, 200) + '...';
      }

      return {
        content,
        excerpt,
        relevance: titleMatch ? 2 : 1, // Título tem prioridade
      };
    })
    .filter((result): result is NonNullable<typeof result> => result !== null)
    .sort((a, b) => b.relevance - a.relevance);

  // Filtra por categoria se fornecida
  if (category) {
    results = results.filter((r) => r.content.category === category);
  }

  // Limita resultados
  return results.slice(0, limit).map(({ content, excerpt }) => ({ content, excerpt }));
}

/**
 * Configurações centralizadas para code splitting e dynamic imports
 * Otimiza o bundle inicial e melhora performance de carregamento
 */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Componente de loading padrão para imports dinâmicos
 */
export const DefaultLoadingComponent = () => {
  return null; // Componente vazio para evitar erros de JSX
};

/**
 * Componente de erro padrão
 */
export const DefaultErrorComponent = () => {
  return null; // Componente vazio para evitar erros de JSX
};

/**
 * Configurações de import dinâmico por categoria de componente
 */
export const DYNAMIC_IMPORT_CONFIG = {
  // Componentes pesados que só aparecem após interação
  heavy: {
    ssr: false,
    loading: () => <DefaultLoadingComponent />,
  },
  // Componentes que podem ser renderizados no servidor
  interactive: {
    ssr: true,
    loading: () => <DefaultLoadingComponent />,
  },
  // Componentes críticos que devem carregar rapidamente
  critical: {
    ssr: true,
    loading: () => null, // Sem loading state para evitar flash
  },
  // Componentes de visualização que são opcionais
  optional: {
    ssr: false,
    loading: () => <DefaultLoadingComponent />,
  },
} as const;

/**
 * Dynamic imports organizados por funcionalidade
 */

// Visualizadores de árvores - Pesados, apenas client-side
export const AVLTreeVisualizer = dynamic(
  () => import('@/components/avl-tree-visualizer').then(mod => ({ default: mod.AVLTreeVisualizer })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

export const RedBlackTreeVisualizer = dynamic(
  () => import('@/components/redblack-tree-visualizer').then(mod => ({ default: mod.RedBlackTreeVisualizer })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

export const SplayTreeVisualizer = dynamic(
  () => import('@/components/splay-tree-visualizer').then(mod => ({ default: mod.SplayTreeVisualizer })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

export const BTreeVisualizer = dynamic(
  () => import('@/components/btree-visualizer').then(mod => ({ default: mod.BTreeVisualizer })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

// PDF Viewer - Muito pesado (PDF.js + Fabric.js)
export const PDFViewer = dynamic(
  () => import('@/components/pdf-viewer').then(mod => ({ default: mod.PDFViewer })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

// Compilador de código - Pesado, apenas client-side
export const CodeCompiler = dynamic(
  () => import('@/components/code-compiler').then(mod => ({ default: mod.CodeCompiler })),
  DYNAMIC_IMPORT_CONFIG.heavy
);

// Componentes interativos mais leves
export const SearchBar = dynamic(
  () => import('@/components/search-bar').then(mod => ({ default: mod.SearchBar })),
  DYNAMIC_IMPORT_CONFIG.interactive
);

export const TableOfContents = dynamic(
  () => import('@/components/table-of-contents').then(mod => ({ default: mod.TableOfContents })),
  DYNAMIC_IMPORT_CONFIG.interactive
);

export const CourseProgress = dynamic(
  () => import('@/components/course-progress').then(mod => ({ default: mod.CourseProgress })),
  DYNAMIC_IMPORT_CONFIG.interactive
);

// Componentes opcionais
export const FavoritesList = dynamic(
  () => import('@/components/favorites-list').then(mod => ({ default: mod.FavoritesList })),
  DYNAMIC_IMPORT_CONFIG.optional
);

export const AnimatedHero = dynamic(
  () => import('@/components/animated-hero').then(mod => ({ default: mod.AnimatedHero })),
  DYNAMIC_IMPORT_CONFIG.optional
);

/**
 * Helper para criar dynamic import customizado
 * @param importFn - Função de import
 * @param options - Opções de configuração
 */
export function createDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    ssr?: boolean;
    loading?: ComponentType;
    error?: ComponentType;
  } = {}
) {
  return dynamic(importFn, {
    ssr: options.ssr ?? false,
    loading: options.loading ?? DefaultLoadingComponent,
  });
}

/**
 * Preload de componentes críticos
 * Executa preload de componentes que provavelmente serão usados
 */
export function preloadCriticalComponents() {
  if (typeof window === 'undefined') return;

  // Preload PDF viewer se houver PDFs na página
  if (document.querySelector('[data-pdf]')) {
    import('@/components/pdf-viewer');
  }

  // Preload compilador se houver código C/C++
  if (document.querySelector('code.language-c, code.language-cpp')) {
    import('@/components/code-compiler');
  }

  // Preload visualizadores se houver indicação de árvores
  const contentText = document.body.textContent?.toLowerCase() || '';
  if (contentText.includes('avl')) {
    import('@/components/avl-tree-visualizer');
  }
  if (contentText.includes('rubro-negra') || contentText.includes('red-black')) {
    import('@/components/redblack-tree-visualizer');
  }
}

/**
 * Lazy load com retry em caso de falha
 * Útil para conexões instáveis
 */
export async function lazyLoadWithRetry<T>(
  importFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    if (retries <= 0) throw error;

    await new Promise(resolve => setTimeout(resolve, delay));
    return lazyLoadWithRetry(importFn, retries - 1, delay * 2);
  }
}

/**
 * Registra eventos de performance para imports dinâmicos
 */
export function trackDynamicImport(componentName: string, loadTime: number) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`dynamic-import-${componentName}`);

    // Log para desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Dynamic Import] ${componentName} carregado em ${loadTime}ms`);
    }
  }
}

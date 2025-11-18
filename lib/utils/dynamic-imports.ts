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
    loading: DefaultLoadingComponent,
  },
  // Componentes que podem ser renderizados no servidor
  interactive: {
    ssr: true,
    loading: DefaultLoadingComponent,
  },
  // Componentes críticos que devem carregar rapidamente
  critical: {
    ssr: true,
    loading: () => null, // Sem loading state para evitar flash
  },
  // Componentes de visualização que são opcionais
  optional: {
    ssr: false,
    loading: DefaultLoadingComponent,
  },
} as const;

/**
 * Dynamic imports organizados por funcionalidade
 *
 * Nota: Os imports abaixo são exemplos de como usar dynamic imports.
 * Descomente e ajuste conforme os componentes reais do projeto.
 *
 * Exemplo:
 * export const PDFViewer = dynamic(
 *   () => import('@/components/pdf-viewer').then(mod => ({ default: mod.PDFViewer })),
 *   DYNAMIC_IMPORT_CONFIG.heavy
 * );
 */

// Descomente quando os componentes estiverem implementados:
// export const PDFViewer = dynamic(() => import('@/components/pdf-viewer'), DYNAMIC_IMPORT_CONFIG.heavy);
// export const CodeCompiler = dynamic(() => import('@/components/code-compiler'), DYNAMIC_IMPORT_CONFIG.heavy);

/**
 * Helper para criar dynamic import customizado
 * @param importFn - Função de import
 * @param options - Opções de configuração
 */
export function createDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFn, {
    ssr: options.ssr ?? false,
    loading: () => null,
  });
}

/**
 * Preload de componentes críticos
 * Executa preload de componentes que provavelmente serão usados
 *
 * Exemplo de uso:
 * if (document.querySelector('[data-pdf]')) {
 *   import('@/components/pdf-viewer');
 * }
 */
export function preloadCriticalComponents() {
  if (typeof window === 'undefined') return;

  // Adicione imports de componentes reais aqui quando necessário
  // Exemplo: import('@/components/seu-componente');
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

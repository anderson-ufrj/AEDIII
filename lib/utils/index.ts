/**
 * Barrel export de todos os utilitários
 * Facilita importação de funções auxiliares
 */

// Otimização de imagens
export {
  IMAGE_CONFIGS,
  generateBlurDataURL,
  calculateResponsiveDimensions,
  getImageConfig,
  shouldPrioritize,
  formatImagePath,
  getOptimizedImageProps,
  createImageObserver,
  type ImageType,
  type OptimizedImageProps,
} from './image-optimizer';

// Dynamic imports
export {
  DefaultLoadingComponent,
  DefaultErrorComponent,
  DYNAMIC_IMPORT_CONFIG,
  AVLTreeVisualizer,
  RedBlackTreeVisualizer,
  SplayTreeVisualizer,
  BTreeVisualizer,
  PDFViewer,
  CodeCompiler,
  SearchBar,
  TableOfContents,
  CourseProgress,
  FavoritesList,
  AnimatedHero,
  createDynamicImport,
  preloadCriticalComponents,
  lazyLoadWithRetry,
  trackDynamicImport,
} from './dynamic-imports';

// Cache manager
export {
  cacheManager,
  CACHE_TTL,
  useCachedData,
} from './cache-manager';

// Exportação de anotações
export {
  exportarParaJSON,
  exportarParaCSV,
  exportarParaTXT,
  type Anotacao,
} from './exportar-anotacoes';

/**
 * Utilitários gerais
 */

/**
 * Formata número de páginas
 */
export function formatarPaginas(num: number): string {
  return num === 1 ? '1 página' : `${num} páginas`;
}

/**
 * Formata data para pt-BR
 */
export function formatarData(data: Date | string | number): string {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Trunca texto com reticências
 */
export function truncarTexto(texto: string, limite: number = 100): string {
  if (texto.length <= limite) return texto;
  return texto.substring(0, limite).trim() + '...';
}

/**
 * Remove acentos de string
 */
export function removerAcentos(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Gera slug a partir de texto
 */
export function gerarSlug(texto: string): string {
  return removerAcentos(texto)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Valida email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Aguarda tempo em ms (sleep)
 */
export function aguardar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce de função
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle de função
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Copia texto para clipboard
 */
export async function copiarParaClipboard(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (error) {
    console.error('Erro ao copiar:', error);
    return false;
  }
}

/**
 * Detecta tema do sistema
 */
export function detectarTemaSistema(): 'claro' | 'escuro' {
  if (typeof window === 'undefined') return 'claro';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'escuro'
    : 'claro';
}

/**
 * Calcula tempo estimado de leitura (palavras por minuto)
 */
export function calcularTempoLeitura(
  texto: string,
  ppm: number = 200
): number {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.ceil(palavras / ppm);
}

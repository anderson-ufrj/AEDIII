/**
 * Utilitários para otimização de carregamento de imagens
 * Implementa lazy loading, blur placeholder e dimensionamento responsivo
 */

/**
 * Configurações de otimização de imagem por tipo de conteúdo
 */
export const IMAGE_CONFIGS = {
  content: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px',
    quality: 85,
    loading: 'lazy' as const,
    placeholder: 'blur' as const,
  },
  thumbnail: {
    sizes: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px',
    quality: 75,
    loading: 'lazy' as const,
    placeholder: 'blur' as const,
  },
  hero: {
    sizes: '100vw',
    quality: 90,
    loading: 'eager' as const,
    priority: true,
  },
  icon: {
    sizes: '(max-width: 768px) 24px, 32px',
    quality: 90,
    loading: 'eager' as const,
  },
} as const;

/**
 * Gera blur data URL para placeholder
 * @param width - Largura da imagem placeholder
 * @param height - Altura da imagem placeholder
 * @returns Data URL do SVG blur
 */
export function generateBlurDataURL(width: number = 40, height: number = 40): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
      </filter>
      <rect width="${width}" height="${height}" fill="#e4e4e7" filter="url(#blur)"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Calcula dimensões responsivas mantendo aspect ratio
 * @param originalWidth - Largura original
 * @param originalHeight - Altura original
 * @param maxWidth - Largura máxima desejada
 * @returns Objeto com width e height calculados
 */
export function calculateResponsiveDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }

  const aspectRatio = originalHeight / originalWidth;
  return {
    width: maxWidth,
    height: Math.round(maxWidth * aspectRatio),
  };
}

/**
 * Tipos de imagem para otimização
 */
export type ImageType = keyof typeof IMAGE_CONFIGS;

/**
 * Obtém configuração de imagem por tipo
 * @param type - Tipo de imagem
 * @returns Configuração de otimização
 */
export function getImageConfig(type: ImageType = 'content') {
  return IMAGE_CONFIGS[type];
}

/**
 * Verifica se imagem deve usar loading prioritário
 * @param type - Tipo de imagem
 * @param index - Índice da imagem (para carregar primeiras com prioridade)
 * @returns Boolean indicando se deve ter prioridade
 */
export function shouldPrioritize(type: ImageType, index: number = 0): boolean {
  if (type === 'hero' || type === 'icon') return true;
  return index < 2; // Primeiras 2 imagens above-the-fold
}

/**
 * Formata caminho de imagem para otimização
 * @param src - Caminho da imagem
 * @param basePath - Caminho base (default: /lib/content/images/)
 * @returns Caminho formatado
 */
export function formatImagePath(src: string, basePath: string = '/lib/content/images/'): string {
  // Se já é URL absoluta ou data URL, retorna como está
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }

  // Remove ../ do início se presente
  const cleanSrc = src.replace(/^\.\.\//, '');

  // Se já começa com /, retorna como está
  if (cleanSrc.startsWith('/')) {
    return cleanSrc;
  }

  // Adiciona basePath
  return `${basePath}${cleanSrc}`;
}

/**
 * Interface para configuração completa de imagem otimizada
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  type?: ImageType;
  index?: number;
  className?: string;
}

/**
 * Gera props otimizadas para componente Image do Next.js
 * @param props - Propriedades da imagem
 * @returns Props otimizadas para Next Image
 */
export function getOptimizedImageProps({
  src,
  alt,
  width,
  height,
  type = 'content',
  index = 0,
  className,
}: OptimizedImageProps) {
  const config = getImageConfig(type);
  const formattedSrc = formatImagePath(src);
  const priority = shouldPrioritize(type, index);

  return {
    src: formattedSrc,
    alt,
    width,
    height,
    className,
    quality: config.quality,
    sizes: config.sizes,
    loading: priority ? 'eager' : config.loading,
    priority,
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL(width, height),
  };
}

/**
 * Hook para observar quando imagens entram no viewport
 * Útil para analytics e lazy loading manual
 */
export function createImageObserver(
  callback: (entry: IntersectionObserverEntry) => void
): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;

  const options = {
    root: null,
    rootMargin: '50px', // Começa a carregar 50px antes de entrar no viewport
    threshold: 0.01,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
}

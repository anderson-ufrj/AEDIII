/**
 * Barrel export de todas as constantes
 * Centraliza acesso a configurações
 */

export { ARIA_LABELS, getAriaLabel } from './aria-labels';
export { A11Y_COLORS, getCategoryColor } from './a11y-colors';
export { TEMAS_DISPONIVEIS, type TemaID } from './temas';

/**
 * URLs da aplicação
 */
export const URLS = {
  BASE: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  API: {
    BUSCA: '/api/search',
    MANIFEST: '/api/manifest',
  },
  EXTERNAS: {
    IFSULDEMINAS: 'https://portal.ifsuldeminas.edu.br',
    GITHUB: 'https://github.com/anderson-ufrj/AEDIII',
  },
} as const;

/**
 * Limites e configurações
 */
export const CONFIG = {
  BUSCA: {
    LIMITE_RESULTADOS: 10,
    DEBOUNCE_MS: 500,
    MIN_CARACTERES: 2,
  },
  CACHE: {
    TTL_CONTEUDO: 1000 * 60 * 30, // 30 min
    TTL_BUSCA: 1000 * 60 * 5, // 5 min
  },
  COMPILADOR: {
    TIMEOUT_MS: 10000, // 10s
    LIMITE_CPU_S: 2, // 2s
    LIMITE_MEMORIA_MB: 128,
  },
  PDF: {
    MAX_ZOOM: 3.0,
    MIN_ZOOM: 0.5,
    ZOOM_STEP: 0.25,
  },
} as const;

/**
 * Mensagens padrão
 */
export const MENSAGENS = {
  ERRO: {
    GENERICO: 'Ocorreu um erro. Tente novamente.',
    CARREGAMENTO: 'Erro ao carregar conteúdo.',
    BUSCA: 'Erro ao realizar busca.',
    REDE: 'Verifique sua conexão com a internet.',
  },
  SUCESSO: {
    SALVO: 'Salvo com sucesso!',
    COPIADO: 'Copiado para área de transferência!',
    EXPORTADO: 'Exportado com sucesso!',
  },
  INFO: {
    SEM_RESULTADOS: 'Nenhum resultado encontrado.',
    CARREGANDO: 'Carregando...',
    VAZIO: 'Nenhum item disponível.',
  },
} as const;

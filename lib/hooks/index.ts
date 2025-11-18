/**
 * Barrel export de todos os hooks customizados
 * Facilita importação centralizada
 */

export { useKeyboardNavigation } from './use-keyboard-navigation';
export { useAtalhosTeclado } from './use-atalhos-teclado';
export { useProgressoLeitura, obterTodosProgressos } from './use-progresso-leitura';
export { useCachedData } from '../utils/cache-manager';

// Re-export de hooks do diretório hooks/
export { useIsMobile } from '../../hooks/use-mobile';

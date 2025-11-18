/**
 * Tipos adicionais para componentes
 * Melhora type-safety em toda aplicação
 */

import { ReactNode } from 'react';

/**
 * Props base para componentes que aceitam children
 */
export interface ComChildrenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Props para componentes de navegação
 */
export interface NavegacaoProps {
  anterior?: { slug: string; titulo: string } | null;
  proximo?: { slug: string; titulo: string } | null;
}

/**
 * Estados de carregamento
 */
export type EstadoCarregamento = 'idle' | 'loading' | 'success' | 'error';

/**
 * Resultado de busca tipado
 */
export interface ResultadoBusca {
  slug: string;
  titulo: string;
  trecho: string;
  categoria: string;
  relevancia?: number;
}

/**
 * Configuração de tema
 */
export interface ConfigTema {
  nome: string;
  cores: {
    fundo: string;
    texto: string;
    primaria: string;
    secundaria: string;
  };
}

/**
 * Metadados de página
 */
export interface MetadadosPagina {
  titulo: string;
  descricao: string;
  palavrasChave?: string[];
  autor?: string;
  dataPublicacao?: string;
}

/**
 * Props de modal/dialog
 */
export interface ModalProps extends ComChildrenProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo?: string;
  descricao?: string;
}

/**
 * Preferências do usuário
 */
export interface PreferenciasUsuario {
  tema: string;
  tamanhoFonte: 'pequeno' | 'medio' | 'grande';
  modoLeitura: boolean;
  animacoesReduzidas: boolean;
}

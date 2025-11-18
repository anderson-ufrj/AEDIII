/**
 * Configurações de temas adicionais para a aplicação
 */

export const TEMAS_DISPONIVEIS = {
  claro: {
    nome: 'Claro',
    cores: {
      fundo: '#ffffff',
      texto: '#000000',
      primaria: '#2D8C46',
      secundaria: '#C41E3A',
    },
  },
  escuro: {
    nome: 'Escuro',
    cores: {
      fundo: '#09090b',
      texto: '#fafafa',
      primaria: '#3fb768',
      secundaria: '#ef4444',
    },
  },
  sepia: {
    nome: 'Sépia (Leitura)',
    cores: {
      fundo: '#f4ecd8',
      texto: '#5c4b37',
      primaria: '#2D8C46',
      secundaria: '#8b4513',
    },
  },
  altoContraste: {
    nome: 'Alto Contraste',
    cores: {
      fundo: '#000000',
      texto: '#ffff00',
      primaria: '#00ff00',
      secundaria: '#ff00ff',
    },
  },
} as const;

export type TemaID = keyof typeof TEMAS_DISPONIVEIS;

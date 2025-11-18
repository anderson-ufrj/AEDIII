export interface CourseContent {
  slug: string;
  title: string;
  author: string;
  pages: number;
  source: string;
  content: string;
  category: string;
  order: number;
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'arvores',
    name: 'Árvores Balanceadas',
    description: 'AVL, Rubro-Negra, Splay e Árvores B',
    icon: 'tree',
    order: 1,
  },
  {
    id: 'hash',
    name: 'Tabelas Hash',
    description: 'Funções hash e tratamento de colisões',
    icon: 'hash',
    order: 2,
  },
  {
    id: 'arquivos',
    name: 'Manipulação de Arquivos',
    description: 'Organização e acesso a dados',
    icon: 'file',
    order: 3,
  },
  {
    id: 'compressao',
    name: 'Compressão e Criptografia',
    description: 'Algoritmos de compactação e segurança',
    icon: 'lock',
    order: 4,
  },
  {
    id: 'algoritmos',
    name: 'Algoritmos e Técnicas',
    description: 'Backtracking, programação dinâmica',
    icon: 'cpu',
    order: 5,
  },
  {
    id: 'exercicios',
    name: 'Exercícios',
    description: 'Problemas e desafios práticos',
    icon: 'pen',
    order: 6,
  },
];

export const CONTENT_MAPPING: Record<string, { category: string; order: number; title: string }> = {
  // Árvores Balanceadas - Ordem: do mais simples ao mais complexo
  '001_-_AVL': { category: 'arvores', order: 1, title: 'Árvores AVL - Teoria' },
  '002_-_AVL-Implementacao': { category: 'arvores', order: 2, title: 'Árvores AVL - Implementação' },
  '004_-_Splay_Tree': { category: 'arvores', order: 3, title: 'Árvores Splay' },
  '003_-_Arvore_Rubro_Negra': { category: 'arvores', order: 4, title: 'Árvores Rubro-Negra' },
  '005_-_Arvore_B': { category: 'arvores', order: 5, title: 'Árvores B' },

  // Tabelas Hash - Apenas um arquivo
  'Tabela Hash': { category: 'hash', order: 1, title: 'Tabelas Hash' },

  // Manipulação de Arquivos - Ordem lógica: hardware → organização → I/O prático
  '005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento': {
    category: 'arquivos',
    order: 1,
    title: 'Dispositivos de Armazenamento'
  },
  '006_-_Formas_Basicas_de_Organizacao_de_Arquivos': {
    category: 'arquivos',
    order: 2,
    title: 'Organização de Arquivos'
  },
  '007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C': {
    category: 'arquivos',
    order: 3,
    title: 'Entrada e Saída em C'
  },

  // Compressão e Criptografia
  '008_-_Compactacao_de_Arquivos': { category: 'compressao', order: 1, title: 'Compactação de Arquivos' },
  '009_-_Criptografia': { category: 'compressao', order: 2, title: 'Criptografia' },

  // Algoritmos e Técnicas - Reorganizado por complexidade conceitual
  // 1. Estruturas C++ STL (fundamentos)
  'estruturas1': { category: 'algoritmos', order: 1, title: 'Estruturas C++ - Vector e Iterator' },
  'estruturas2': { category: 'algoritmos', order: 2, title: 'Estruturas C++ - Set, Map e Bitset' },
  'estruturas3': { category: 'algoritmos', order: 3, title: 'Estruturas C++ - Deque, Stack e Queue' },
  'estruturas4': { category: 'algoritmos', order: 4, title: 'Estruturas C++ - Pair e Tuplas' },
  // 2. Técnicas algorítmicas (do mais básico ao mais avançado)
  'pesquisa_completa': { category: 'algoritmos', order: 5, title: 'Pesquisa Completa e Permutações' },
  'backtracking': { category: 'algoritmos', order: 6, title: 'Backtracking - Sudoku e N-Rainhas' },
  'mochila': { category: 'algoritmos', order: 7, title: 'Problema da Mochila (0-1 e Fracionária)' },

  // Exercícios
  'Exercícios': { category: 'exercicios', order: 1, title: 'Lista de Exercícios' },
};

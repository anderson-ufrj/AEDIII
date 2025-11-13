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
  '001_-_AVL': { category: 'arvores', order: 1, title: 'Árvores AVL' },
  '002_-_AVL-Implementacao': { category: 'arvores', order: 2, title: 'Implementação AVL' },
  '003_-_Arvore_Rubro_Negra': { category: 'arvores', order: 3, title: 'Árvores Rubro-Negra' },
  '004_-_Splay_Tree': { category: 'arvores', order: 4, title: 'Splay Trees' },
  '005_-_Arvore_B': { category: 'arvores', order: 5, title: 'Árvores B' },
  'Tabela Hash': { category: 'hash', order: 1, title: 'Tabelas Hash' },
  '005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento': {
    category: 'arquivos',
    order: 1,
    title: 'Manipulação de Dados e Dispositivos'
  },
  '006_-_Formas_Basicas_de_Organizacao_de_Arquivos': {
    category: 'arquivos',
    order: 2,
    title: 'Organização de Arquivos'
  },
  '007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C': {
    category: 'arquivos',
    order: 3,
    title: 'I/O em C'
  },
  '008_-_Compactacao_de_Arquivos': { category: 'compressao', order: 1, title: 'Compactação de Arquivos' },
  '009_-_Criptografia': { category: 'compressao', order: 2, title: 'Criptografia' },
  'pesquisa_completa': { category: 'algoritmos', order: 1, title: 'Pesquisa Completa' },
  'backtracking': { category: 'algoritmos', order: 2, title: 'Backtracking' },
  'mochila': { category: 'algoritmos', order: 3, title: 'Problema da Mochila' },
  'estruturas1': { category: 'algoritmos', order: 4, title: 'Estruturas 1' },
  'estruturas2': { category: 'algoritmos', order: 5, title: 'Estruturas 2' },
  'estruturas3': { category: 'algoritmos', order: 6, title: 'Estruturas 3' },
  'estruturas4': { category: 'algoritmos', order: 7, title: 'Estruturas 4' },
  'Exercícios': { category: 'exercicios', order: 1, title: 'Lista de Exercícios' },
};

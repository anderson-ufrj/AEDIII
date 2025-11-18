/**
 * Constantes de labels ARIA para melhorar acessibilidade
 * Centralizadas para consistência em toda a aplicação
 */

export const ARIA_LABELS = {
  // Navegação
  navigation: {
    main: 'Navegação principal',
    content: 'Navegação entre conteúdos',
    breadcrumb: 'Navegação estrutural',
    skipToContent: 'Pular para o conteúdo principal',
    previousContent: 'Ir para conteúdo anterior',
    nextContent: 'Ir para próximo conteúdo',
    goHome: 'Ir para página inicial',
    viewAllContent: 'Ver todo o conteúdo',
    openMenu: 'Abrir menu de navegação',
    closeMenu: 'Fechar menu de navegação',
  },

  // Busca
  search: {
    input: 'Buscar no conteúdo do curso',
    submit: 'Realizar busca',
    clear: 'Limpar busca',
    results: 'Resultados da busca',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando resultados',
    showFilters: 'Mostrar filtros de busca',
    hideFilters: 'Esconder filtros de busca',
    filterByCategory: 'Filtrar por categoria',
  },

  // PDF Viewer
  pdfViewer: {
    container: 'Visualizador de PDF',
    canvas: 'Página do PDF',
    previousPage: 'Ir para página anterior',
    nextPage: 'Ir para próxima página',
    zoomIn: 'Aumentar zoom',
    zoomOut: 'Diminuir zoom',
    resetZoom: 'Resetar zoom',
    download: 'Baixar PDF',
    print: 'Imprimir PDF',
    fullscreen: 'Tela cheia',
    exitFullscreen: 'Sair da tela cheia',
  },

  // Anotações
  annotations: {
    toolbar: 'Ferramentas de anotação',
    draw: 'Ferramenta de desenho',
    highlight: 'Ferramenta de destaque',
    erase: 'Ferramenta de apagar',
    text: 'Ferramenta de texto',
    clear: 'Limpar todas as anotações',
    save: 'Salvar anotações',
    export: 'Exportar anotações',
    colorPicker: 'Escolher cor',
    lineWidth: 'Espessura da linha',
  },

  // Compilador
  compiler: {
    container: 'Compilador de código C/C++',
    editor: 'Editor de código',
    run: 'Executar código',
    stop: 'Parar execução',
    input: 'Entrada de dados (stdin)',
    output: 'Saída do programa (stdout)',
    errors: 'Erros de compilação',
    clear: 'Limpar código',
    copy: 'Copiar código',
    paste: 'Colar código',
    language: 'Selecionar linguagem',
  },

  // Favoritos
  favorites: {
    add: 'Adicionar aos favoritos',
    remove: 'Remover dos favoritos',
    list: 'Lista de favoritos',
    empty: 'Nenhum favorito adicionado',
    clear: 'Limpar todos os favoritos',
  },

  // Tema
  theme: {
    toggle: 'Alternar tema',
    light: 'Tema claro',
    dark: 'Tema escuro',
    system: 'Tema do sistema',
  },

  // Conteúdo
  content: {
    card: 'Card de conteúdo',
    category: 'Categoria do conteúdo',
    readingTime: 'Tempo estimado de leitura',
    progress: 'Progresso de leitura',
    tableOfContents: 'Índice de conteúdo',
    scrollToTop: 'Voltar ao topo',
  },

  // Formulários
  forms: {
    required: 'Campo obrigatório',
    optional: 'Campo opcional',
    error: 'Erro no campo',
    valid: 'Campo válido',
    submit: 'Enviar formulário',
    reset: 'Limpar formulário',
  },

  // Feedback
  feedback: {
    success: 'Operação realizada com sucesso',
    error: 'Erro na operação',
    warning: 'Aviso',
    info: 'Informação',
    loading: 'Carregando',
    close: 'Fechar mensagem',
  },

  // Acessibilidade
  accessibility: {
    loading: 'Carregando conteúdo',
    processing: 'Processando',
    expandSection: 'Expandir seção',
    collapseSection: 'Recolher seção',
    openDialog: 'Abrir diálogo',
    closeDialog: 'Fechar diálogo',
    currentPage: 'Página atual',
    totalPages: 'Total de páginas',
  },
} as const;

/**
 * Função auxiliar para obter label ARIA com parâmetros dinâmicos
 */
export function getAriaLabel(
  category: keyof typeof ARIA_LABELS,
  key: string,
  params?: Record<string, string | number>
): string {
  const labels = ARIA_LABELS[category] as Record<string, string>;
  let label = labels[key] || key;

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      label = label.replace(`{${paramKey}}`, String(paramValue));
    });
  }

  return label;
}

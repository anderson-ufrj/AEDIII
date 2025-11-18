# AED III - Website do Curso

Website desenvolvido para a disciplina de Algoritmos e Estruturas de Dados III (AED III) do IFSULDEMINAS - Bacharelado em Ciência da Computação.

## Autor

**Anderson Henrique da Silva**
Ciência da Computação - IFSULDEMINAS

## Sobre o Projeto

Este website foi criado para organizar e disponibilizar todo o material didático da disciplina AED III de forma moderna e acessível. O conteúdo foi extraído automaticamente dos PDFs do curso e convertido para Markdown, permitindo fácil navegação e busca.

## Tecnologias Utilizadas

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[React 19](https://react.dev/)** - Biblioteca UI com novos hooks
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática robusta
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário moderno

### UI e Componentes
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes acessíveis e customizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI sem estilo
- **[Lucide React](https://lucide.dev/)** - Ícones SVG modernos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas

### Funcionalidades Específicas
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Renderização de Markdown
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Visualização de PDFs
- **[Fabric.js](http://fabricjs.com/)** - Canvas para anotações
- **[Judge0 API](https://judge0.com/)** - Compilação de código C/C++
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Parse de frontmatter

### Testes
- **[Vitest](https://vitest.dev/)** - Framework de testes rápido
- **[Testing Library](https://testing-library.com/)** - Testes de componentes React

## Estrutura do Conteúdo

O material está organizado em 6 categorias principais:

### 1. Árvores Balanceadas
- Árvores AVL
- Árvores Rubro-Negra
- Splay Trees
- Árvores B

### 2. Tabelas Hash
- Funções Hash
- Tratamento de Colisões

### 3. Manipulação de Arquivos
- Organização de Arquivos
- I/O em C
- Dispositivos de Armazenamento

### 4. Compressão e Criptografia
- Algoritmos de Compactação
- Criptografia e Segurança

### 5. Algoritmos e Técnicas
- Backtracking
- Programação Dinâmica
- Problema da Mochila
- Pesquisa Completa

### 6. Exercícios
- Lista de Exercícios Práticos

## Como Executar Localmente

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
# Navegue até o diretório do projeto
cd aed3-website

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento com Turbopack
npm run build        # Cria build de produção otimizado
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint

# Testes
npm test             # Executa testes em modo watch
npm run test:run     # Executa todos os testes uma vez
npm run test:ui      # Abre interface visual dos testes
npm run test:coverage # Gera relatório de cobertura de testes
```

## Deploy

O projeto está configurado para deploy automático na [Vercel](https://vercel.com/).

### Deploy Manual

```bash
npm run build
```

## Estrutura do Projeto

```
aed3-website/
├── app/                      # App Router do Next.js
│   ├── content/             # Páginas de conteúdo
│   │   ├── [slug]/         # Páginas dinâmicas
│   │   └── page.tsx        # Lista de conteúdo
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Página inicial
├── components/             # Componentes React
│   └── ui/                # Componentes shadcn/ui
├── lib/                   # Utilitários e helpers
│   ├── content/          # Arquivos Markdown do curso
│   ├── content-loader.ts # Carregador de conteúdo
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
└── package.json          # Dependências
```

## Funcionalidades

### Principais
- ✅ **Navegação intuitiva** por 6 categorias organizadas
- ✅ **Visualização de conteúdo** em Markdown com syntax highlighting
- ✅ **Compilador C/C++ integrado** - Execute código direto no navegador
- ✅ **Visualizador de PDF** com ferramentas de anotação
- ✅ **Visualizadores interativos** de árvores (AVL, Rubro-Negra, Splay, B)
- ✅ **Sistema de favoritos** para marcar conteúdos importantes
- ✅ **Busca em tempo real** em todo o conteúdo do curso
- ✅ **Modo escuro/claro** com transições suaves
- ✅ **Design 100% responsivo** otimizado para mobile

### Técnicas
- ✅ Geração estática de páginas (SSG) para performance máxima
- ✅ Code splitting avançado reduzindo bundle inicial
- ✅ Cache em duas camadas (memória + localStorage)
- ✅ Lazy loading de imagens com blur placeholder
- ✅ Tipagem completa com TypeScript
- ✅ SEO otimizado com metadados dinâmicos
- ✅ PWA (Progressive Web App) com service worker

### Acessibilidade
- ✅ Navegação completa por teclado (atalhos Alt+Seta)
- ✅ Labels ARIA em todos componentes interativos
- ✅ Contraste de cores WCAG AA (muitos AAA)
- ✅ Indicadores de foco visíveis e consistentes
- ✅ Suporte a leitores de tela
- ✅ Integração com VLibras (Língua Brasileira de Sinais)

## Conversão de PDFs

Os PDFs originais foram convertidos para Markdown usando um script customizado:

```bash
# No diretório raiz do projeto AED III
source venv/bin/activate
python3 scripts/extract_pdfs.py --docs-dir ./docs --output-dir ./content
```

## Licença

Este projeto é educacional e destina-se ao uso acadêmico no IFSULDEMINAS.

---

**Desenvolvido para a disciplina AED III - IFSULDEMINAS**

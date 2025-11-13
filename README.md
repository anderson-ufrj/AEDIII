# AED III - Website do Curso

Website desenvolvido para a disciplina de Algoritmos e Estruturas de Dados III (AED III) do IFSULDEMINAS - Bacharelado em Ciência da Computação.

## Autor

**Anderson Henrique da Silva**
Ciência da Computação - IFSULDEMINAS

## Sobre o Projeto

Este website foi criado para organizar e disponibilizar todo o material didático da disciplina AED III de forma moderna e acessível. O conteúdo foi extraído automaticamente dos PDFs do curso e convertido para Markdown, permitindo fácil navegação e busca.

## Tecnologias Utilizadas

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI modernos
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Renderização de Markdown
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

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

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

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

- ✅ Navegação por categorias
- ✅ Visualização de conteúdo em Markdown
- ✅ Design responsivo
- ✅ Modo escuro/claro
- ✅ Tipagem completa com TypeScript
- ✅ Geração estática de páginas
- ✅ SEO otimizado

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

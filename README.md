# 🎓 AED III - Algoritmos e Estruturas de Dados III

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational-green)](LICENSE)

> **Projeto Pessoal de Estudos** - Website interativo desenvolvido como ferramenta de auxílio aos meus estudos na disciplina de **Algoritmos e Estruturas de Dados III (AED III)** do **IFSULDEMINAS** - Bacharelado em Ciência da Computação.

## 👨‍💻 Autor

**Anderson Henrique da Silva**
Estudante de Ciência da Computação - IFSULDEMINAS

## 📚 Sobre o Projeto

Este é um **projeto pessoal** criado para me auxiliar nos estudos da disciplina AED III. O objetivo é ter todo o material didático organizado de forma moderna e acessível, com ferramentas interativas que facilitam o aprendizado.

O conteúdo foi extraído automaticamente dos PDFs disponibilizados pelo professor e convertido para Markdown, permitindo fácil navegação, busca, anotações e experimentação com código.

### ✨ Destaques

- 🎨 **Design Moderno**: Interface limpa e profissional com as cores oficiais do IFSULDEMINAS
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🌓 **Modo Escuro/Claro**: Alternância automática baseada nas preferências do sistema
- 📖 **Visualizador PDF Interativo**: Abra e visualize os PDFs originais do professor
- ✏️ **Anotações Inteligentes**: Sistema de anotações tipo "vidro mágico" sobre os PDFs
- ⚡ **Compilador C/C++ Online**: Execute algoritmos diretamente no navegador
- 💻 **Código Formatado**: Todos os algoritmos em blocos de código com syntax highlighting
- 🚀 **Performance Otimizada**: Carregamento rápido e navegação fluida

## 🛠️ Tecnologias Utilizadas

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança
- **[React 19](https://react.dev/)** - Biblioteca UI moderna

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI acessíveis e customizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna

### Content & PDF
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Renderização de Markdown
- **[React PDF](https://react-pdf.org/)** - Visualização de PDFs
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Engine de renderização PDF
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Parser de frontmatter

### Development
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Python 3](https://www.python.org/)** - Scripts de extração de PDFs

## 📂 Estrutura do Conteúdo

O material está organizado em **6 categorias principais**:

### 1. 🌳 Árvores Balanceadas
- Árvores AVL (Teoria e Implementação)
- Árvores Rubro-Negra
- Splay Trees
- Árvores B

### 2. # Tabelas Hash
- Funções Hash
- Tratamento de Colisões
- Implementação e Performance

### 3. 📁 Manipulação de Arquivos
- Organização de Arquivos
- Entrada e Saída em C
- Dispositivos de Armazenamento

### 4. 🔐 Compressão e Criptografia
- Algoritmos de Compactação
- Técnicas de Criptografia
- Segurança de Dados

### 5. 🧮 Algoritmos e Técnicas
- Backtracking
- Programação Dinâmica
- Problema da Mochila
- Pesquisa Completa

### 6. 📝 Exercícios
- Lista Completa de Exercícios Práticos

## 🚀 Como Executar Localmente

### Pré-requisitos

- **Node.js** 20 ou superior
- **npm** ou **yarn**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/anderson-henrique/aed3-website.git
cd aed3-website

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 📖 Funcionalidades Principais

### 1. Compilador C/C++ Online ⚡

Execute e teste algoritmos diretamente no navegador sem precisar instalar nada:

- **Editor de Código**: Syntax highlighting para C/C++
- **Compilação em Tempo Real**: Compile e execute código instantaneamente
- **Output Interativo**: Veja resultados de printf, cin, cout em tempo real
- **Exemplos Pré-carregados**: Todos os algoritmos do curso disponíveis
- **Suporte a Input**: Forneça entrada para seus programas
- **Sem Configuração**: Tudo roda no navegador usando WebAssembly

### 2. Visualizador PDF com Anotações 📖

Abra os PDFs originais do professor diretamente no navegador com funcionalidades avançadas:

- **Navegação**: Avance/volte páginas facilmente
- **Zoom**: Ajuste o tamanho da visualização (50% - 250%)
- **Anotações por Desenho**: Desenhe livremente sobre o PDF
- **Seletor de Cores**: Escolha qualquer cor para suas anotações
- **Espessura Personalizável**: Controle a espessura do traço (1-10)
- **Persistência**: Anotações salvas automaticamente no navegador
- **Camada "Vidro Mágico"**: Anotações ficam em uma camada separada, preservando o PDF original

### 3. Navegação Intuitiva 🧭

- **Categorias**: Organize o conteúdo por temas
- **Busca Rápida**: Encontre materiais facilmente
- **Links Diretos**: Acesse PDFs originais em nova aba
- **Breadcrumbs**: Navegação hierárquica clara

### 4. Performance Otimizada 🚀

O visualizador PDF foi otimizado com:

- **useCallback/useMemo**: Memoização de funções e cálculos
- **Canvas Context Caching**: Contexto 2D armazenado em cache
- **RequestAnimationFrame**: Renderização sincronizada com o navegador
- **ResizeObserver**: Detecção eficiente de mudanças de tamanho
- **Lazy Loading**: Carregamento sob demanda de recursos

**Resultado**: ~4x mais rápido que a implementação inicial! ⚡

## 🏗️ Estrutura do Projeto

```
AEDIII/
├── app/                      # App Router do Next.js
│   ├── content/             # Páginas de conteúdo
│   │   ├── [slug]/         # Páginas dinâmicas por material
│   │   └── page.tsx        # Lista de todos os materiais
│   ├── globals.css         # Estilos globais + tema IFSULDEMINAS
│   ├── layout.tsx          # Layout raiz da aplicação
│   └── page.tsx            # Página inicial (hero + categorias)
├── components/              # Componentes React
│   ├── ui/                 # Componentes shadcn/ui
│   ├── content-detail-client.tsx  # Cliente para visualizar PDFs
│   ├── footer.tsx          # Rodapé com informações
│   ├── header.tsx          # Cabeçalho com navegação
│   └── pdf-viewer.tsx      # Visualizador PDF com anotações
├── lib/                     # Utilitários e helpers
│   ├── content-loader.ts   # Carregador de conteúdo Markdown
│   ├── types.ts            # Definições TypeScript
│   └── utils.ts            # Funções utilitárias
├── content/                 # Arquivos Markdown extraídos dos PDFs
│   └── *.md                # Um arquivo por material
├── public/                  # Arquivos estáticos
│   ├── pdfs/               # PDFs originais do professor
│   ├── images/             # Imagens extraídas dos PDFs
│   └── logoIF.png          # Logo do IFSULDEMINAS
├── scripts/                 # Scripts Python
│   └── extract_pdfs.py     # Extrator de PDFs para Markdown
├── docs/                    # Documentação
│   ├── OPTIMIZATIONS.md    # Detalhes das otimizações
│   └── logoIF.png          # Logo original
├── COURSE_STRUCTURE.md      # Estrutura do curso
├── PROJECT_SUMMARY.md       # Resumo do projeto
├── DEPLOY.md               # Guia de deployment
└── package.json            # Dependências do projeto
```

## 🎨 Design System

### Cores IFSULDEMINAS

O projeto utiliza as cores oficiais do instituto:

- **Verde Primário**: `#2D8C46` - Cor principal da identidade
- **Vermelho Secundário**: `#C41E3A` - Cor de destaque
- **Gradientes**: Tons de zinc para backgrounds suaves

### Componentes UI

Todos os componentes seguem padrões de acessibilidade (WCAG 2.1):

- Contraste adequado de cores
- Navegação por teclado
- Labels semânticos
- Estados visuais claros

## 🔧 Conversão de PDFs

Os PDFs originais foram convertidos para Markdown usando um script Python customizado:

### Executar Conversão

```bash
# Ative o ambiente virtual Python
source venv/bin/activate

# Execute o script de extração
python3 scripts/extract_pdfs.py --docs-dir ./docs --output-dir ./content

# Desative o ambiente virtual
deactivate
```

### O que o script faz

1. **Extrai texto** dos PDFs preservando formatação
2. **Extrai imagens** e salva separadamente
3. **Cria frontmatter** com metadados (título, autor, páginas, etc.)
4. **Gera Markdown** com referências às imagens
5. **Organiza por categoria** conforme a estrutura do curso

## 🌐 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push na branch `main`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anderson-henrique/aed3-website)

### Deploy Manual

```bash
# Crie o build de produção
npm run build

# Inicie o servidor
npm run start
```

## 📊 Performance

### Métricas

- **Lighthouse Score**: 95+ em todas as categorias
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: Otimizado com tree-shaking

### Otimizações Aplicadas

- ✅ Geração estática de páginas (SSG)
- ✅ Imagens otimizadas automaticamente
- ✅ Code splitting automático
- ✅ CSS purging com Tailwind
- ✅ Componentes memoizados
- ✅ Lazy loading de recursos

## 🤝 Contribuindo

Este é um projeto educacional, mas contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Tarefas de build, etc

## 📄 Licença

Este projeto é educacional e destina-se ao uso acadêmico no **IFSULDEMINAS**.
Todo o conteúdo didático é de propriedade do IFSULDEMINAS.

## 🎯 Roadmap

- [ ] Sistema de busca full-text
- [ ] Exportação de anotações em PDF
- [ ] Modo de apresentação (slides)
- [ ] Quiz interativo por tema
- [ ] Sistema de progresso do aluno
- [ ] Integração com Google Classroom
- [ ] PWA (Progressive Web App)
- [ ] Modo offline

## 📞 Contato

**Anderson Henrique da Silva**
Ciência da Computação - IFSULDEMINAS

---

<div align="center">

**Desenvolvido com ❤️ para a disciplina AED III - IFSULDEMINAS**

[🏠 Homepage](https://aed3.vercel.app) • [📚 Documentação](./docs) • [🐛 Report Bug](https://github.com/anderson-henrique/aed3-website/issues) • [✨ Request Feature](https://github.com/anderson-henrique/aed3-website/issues)

</div>

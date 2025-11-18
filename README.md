---
title: "AED III - Plataforma Educacional Interativa"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
---

# 📚 AED III - Plataforma Educacional Interativa

> Website desenvolvido para a disciplina de **Algoritmos e Estruturas de Dados III (AED III)** do IFSULDEMINAS - Bacharelado em Ciência da Computação.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 Visão Geral

Plataforma educacional moderna que oferece:

- 📖 **20 tópicos de conteúdo** convertidos de PDF para Markdown
- 💻 **Compilador C/C++ integrado** (Judge0 CE)
- 📄 **Visualizador de PDF** com anotações persistentes
- 🌳 **Visualizadores interativos** de árvores (AVL, RBT, Splay, B-Tree)
- 🎓 **40+ exercícios graduados** (básico, intermediário, avançado)
- 📱 **Progressive Web App** (PWA) com suporte offline
- 🔍 **Busca server-side** inteligente

---

## 🚀 Features Principais

### 1. Sistema de Conteúdo
- **6 categorias** organizadas pedagogicamente
- **Pré-requisitos claros** em cada tópico
- **Tempo estimado de estudo** por material
- **Código compilável** diretamente no browser

### 2. Ferramentas Interativas
- **Compilador Online**: Execute C/C++ com stdin/stdout
- **PDF Viewer**: Anotações com canvas (Fabric.js)
- **Visualizadores**: Estruturas de dados animadas
- **Busca**: Pesquisa em títulos e conteúdo

### 3. Qualidade Garantida
- ✅ Zero duplicações de conteúdo
- ✅ Zero erros ortográficos
- ✅ Código validado e testável
- ✅ Material revisado por IA especializada

---

## 📁 Estrutura do Projeto

```
AEDIII/
├── app/                      # Next.js App Router
│   ├── api/search/          # API de busca server-side
│   ├── content/[slug]/      # Páginas de conteúdo (24 estáticas)
│   └── globals.css          # Estilos globais + tema
├── components/              # Componentes React
│   ├── ui/                 # shadcn/ui components
│   ├── content-detail-client.tsx
│   ├── pdf-viewer.tsx
│   └── code-compiler.tsx
├── lib/
│   ├── content/            # 20 arquivos Markdown
│   │   └── images/        # Imagens extraídas de PDFs
│   ├── content-loader.ts  # Sistema de carregamento
│   └── types.ts           # CONTENT_MAPPING + tipos
├── docs/                   # 📚 Documentação organizada
│   ├── 00-INDICE.md       # Índice geral
│   ├── 01-projeto/        # Visão geral
│   ├── 02-desenvolvimento/ # Guias técnicos
│   ├── 03-analise/        # Relatórios de qualidade
│   └── 04-referencias/    # Configurações
├── scripts/               # Scripts de automação
│   ├── detect-duplications.js
│   ├── fix-orthography.js
│   └── organize-docs.sh
└── public/pdfs/          # PDFs originais

```

---

## 📚 Documentação Completa

Toda a documentação está organizada em **`docs/`** com numeração e metadados padronizados:

### 🔗 Links Rápidos

| Categoria | Descrição | Link |
|-----------|-----------|------|
| 📋 **Índice Geral** | Visão completa da documentação | [docs/00-INDICE.md](docs/00-INDICE.md) |
| 🎯 **Projeto** | README, estrutura, resumo | [docs/01-projeto/](docs/01-projeto/) |
| 🔧 **Desenvolvimento** | Setup, deploy, API, otimizações | [docs/02-desenvolvimento/](docs/02-desenvolvimento/) |
| 📊 **Análise** | Relatórios de qualidade e melhorias | [docs/03-analise/](docs/03-analise/) |
| 🔖 **Referências** | Configurações e instruções | [docs/04-referencias/](docs/04-referencias/) |

---

## 🛠️ Começar a Desenvolver

### Pré-requisitos
- Node.js 18+ e npm
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/AEDIII.git
cd AEDIII

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor dev (Turbopack)
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint

# Testes
npm test             # Vitest (watch mode)
npm run test:run     # Executar uma vez
npm run test:coverage # Cobertura

# Scripts de qualidade
node scripts/detect-duplications.js
node scripts/fix-orthography.js
bash scripts/organize-docs.sh
```

---

## 📖 Conteúdo do Curso

### Categorias Disponíveis

1. **Árvores Balanceadas** (5 tópicos)
   - AVL, Rubro-Negra, Splay, B-Trees

2. **Tabelas Hash** (1 tópico)
   - Funções hash, colisões, performance

3. **Manipulação de Arquivos** (3 tópicos)
   - Dispositivos, organização, I/O em C

4. **Compressão e Criptografia** (2 tópicos)
   - RLE, Huffman, César, Vigenère

5. **Algoritmos e Técnicas** (7 tópicos)
   - Estruturas C++ STL, Backtracking, Mochila

6. **Exercícios** (1 tópico)
   - Lista completa de problemas práticos

---

## 🎓 Métricas de Qualidade

### Melhorias Implementadas (Nov 2025)

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Duplicações** | 107 linhas | 0 | **100%** ✅ |
| **Erros ortográficos** | 230 | 0 | **100%** ✅ |
| **Código quebrado** | 2 arquivos | 0 | **100%** ✅ |
| **Pré-requisitos** | 1 arquivo | 8 arquivos | **+700%** 🎓 |
| **Exercícios** | Básicos | 40+ graduados | **+300%** 💪 |

**Relatório completo**: [docs/03-analise/01-relatorio-melhorias.md](docs/03-analise/01-relatorio-melhorias.md)

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](docs/02-desenvolvimento/05-guia-contribuicao.md).

### Workflow Rápido

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Padrão de commits**: [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🔧 Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript 5.0
- **Estilo**: Tailwind CSS 4.0
- **UI**: shadcn/ui
- **Markdown**: ReactMarkdown + remark-gfm
- **PDF**: pdfjs-dist + Fabric.js
- **Compilador**: Judge0 CE (RapidAPI)
- **Testes**: Vitest + React Testing Library
- **Deploy**: Vercel

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Anderson Henrique da Silva**
- 📍 Localização: Minas Gerais, Brazil
- 🎓 IFSULDEMINAS - Ciência da Computação
- 📧 Contato: [GitHub](https://github.com/anderson-ufrj)

---

## 🙏 Agradecimentos

- **IFSULDEMINAS** - Estrutura e suporte acadêmico
- **Prof. Ricardo José Martins** - Conteúdo original dos PDFs
- **Claude Code (Anthropic)** - Revisão técnica e melhorias
- **Comunidade Open Source** - Bibliotecas e ferramentas utilizadas

---

## 📊 Status do Projeto

- ✅ **Produção**: Deploy ativo
- ✅ **Qualidade**: 5/5 estrelas
- ✅ **Manutenção**: Ativa
- ✅ **Documentação**: Completa

**Última atualização**: 18 de novembro de 2025

---

**⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!**

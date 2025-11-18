---
title: "Resumo do Projeto"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
category: "Projeto"
---

# Resumo do Projeto - Site AED III

## Informações do Projeto

**Nome**: AED III - Website do Curso
**Autor**: Anderson Henrique da Silva
**Instituição**: IFSULDEMINAS - Bacharelado em Ciência da Computação
**Disciplina**: Algoritmos e Estruturas de Dados III
**Data**: Novembro 2025

---

## O Que Foi Desenvolvido

Foi criado um website moderno e completo para disponibilizar todo o material didático da disciplina AED III de forma organizada e acessível.

### Stack Tecnológica

- **Frontend Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui
- **Renderização Markdown**: React Markdown
- **Ícones**: Lucide React
- **Deploy**: Vercel

### Características Principais

1. **Conversão Automatizada de Conteúdo**
   - Script Python personalizado para extrair PDFs
   - Conversão para Markdown preservando imagens
   - Organização automática por categorias

2. **Interface Moderna**
   - Design responsivo para todos os dispositivos
   - Modo claro/escuro
   - Animações suaves e transições
   - Componentes reutilizáveis do shadcn/ui

3. **Navegação Intuitiva**
   - Página inicial com overview do curso
   - Listagem de conteúdo com filtro por categorias
   - Páginas individuais para cada material
   - Breadcrumbs e navegação contextual

4. **Performance**
   - Geração estática de todas as páginas (SSG)
   - 24 páginas geradas estaticamente
   - Otimização automática de imagens
   - Bundle otimizado com Turbopack

---

## Estrutura do Conteúdo

### 19 Materiais Organizados em 6 Categorias

#### 1. Árvores Balanceadas (5 materiais)
- Árvores AVL (teoria e implementação)
- Árvores Rubro-Negra
- Splay Trees
- Árvores B

#### 2. Tabelas Hash (1 material)
- Tabelas Hash e tratamento de colisões

#### 3. Manipulação de Arquivos (3 materiais)
- Manipulação de dados e dispositivos
- Organização de arquivos
- I/O em C

#### 4. Compressão e Criptografia (2 materiais)
- Compactação de arquivos
- Criptografia

#### 5. Algoritmos e Técnicas (7 materiais)
- Pesquisa completa
- Backtracking
- Problema da Mochila
- Estruturas 1, 2, 3 e 4

#### 6. Exercícios (1 material)
- Lista de exercícios práticos

---

## Arquivos e Diretórios

### Estrutura do Projeto

```
AEDIII/
├── docs/                           # PDFs originais do curso
│   └── [19 arquivos PDF]
├── content/                        # Conteúdo extraído em Markdown
│   ├── images/                    # Imagens extraídas dos PDFs
│   └── [19 arquivos .md]
├── scripts/                       # Scripts de automação
│   ├── extract_pdfs.py           # Script de extração
│   └── requirements.txt          # Dependências Python
├── aed3-website/                 # Aplicação Next.js
│   ├── app/                     # Páginas e rotas
│   │   ├── page.tsx            # Homepage
│   │   ├── content/
│   │   │   ├── page.tsx        # Lista de conteúdo
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Página individual
│   ├── components/              # Componentes React
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── lib/                    # Utilitários
│   │   ├── content/           # Arquivos Markdown
│   │   ├── content-loader.ts  # Carregador de conteúdo
│   │   ├── types.ts           # Tipos TypeScript
│   │   └── utils.ts           # Funções auxiliares
│   ├── public/                # Arquivos estáticos
│   └── package.json           # Dependências
├── COURSE_STRUCTURE.md          # Estrutura organizada do curso
└── PROJECT_SUMMARY.md           # Este arquivo
```

---

## Funcionalidades Implementadas

✅ **Extração de Conteúdo**
- Script automatizado de conversão PDF → Markdown
- Preservação de metadados (título, autor, páginas)
- Extração e organização de imagens
- Limpeza e formatação de texto

✅ **Interface do Usuário**
- Homepage com apresentação do curso
- Cards de categorias com descrições
- Listagem completa de materiais
- Filtros por categoria (tabs)
- Visualização individual de cada material
- Renderização rica de Markdown
- Suporte a código e sintaxe
- Imagens responsivas

✅ **Navegação**
- Rotas dinâmicas baseadas em slug
- Breadcrumbs contextuais
- Links entre páginas
- Navegação por categorias

✅ **Performance e SEO**
- Todas as páginas geradas estaticamente
- Metadados configurados
- Tipagem TypeScript completa
- Build otimizado

---

## Como Usar

### 1. Desenvolvimento Local

```bash
cd aed3-website
npm install
npm run dev
```

Acesse: http://localhost:3000

### 2. Build de Produção

```bash
npm run build
npm run start
```

### 3. Deploy na Vercel

O projeto está pronto para deploy na Vercel:
- Conecte o repositório GitHub
- A Vercel detectará automaticamente Next.js
- Deploy automático a cada push

---

## Estatísticas do Projeto

- **PDFs Processados**: 19 documentos
- **Páginas Totais**: ~600 páginas de conteúdo
- **Imagens Extraídas**: Centenas de diagramas e ilustrações
- **Páginas do Site**: 24 páginas estáticas geradas
- **Componentes UI**: 12+ componentes shadcn/ui
- **Tempo de Build**: ~2 segundos
- **Linhas de Código**: ~1000+ linhas TypeScript/React

---

## Próximos Passos (Opcional)

### Melhorias Futuras Possíveis

1. **Busca de Conteúdo**
   - Implementar busca full-text
   - Destacar termos encontrados
   - Filtros avançados

2. **Interatividade**
   - Adicionar anotações
   - Marcadores e favoritos
   - Histórico de leitura

3. **Colaboração**
   - Sistema de comentários
   - Compartilhamento social
   - Exportar para PDF

4. **Analytics**
   - Rastreamento de visualizações
   - Materiais mais acessados
   - Tempo de leitura

5. **Conteúdo Adicional**
   - Vídeos explicativos
   - Exercícios interativos
   - Simuladores de algoritmos

---

## Conclusão

O projeto foi concluído com sucesso! Todos os materiais da disciplina AED III estão agora disponíveis em um website moderno, responsivo e fácil de navegar.

### Tecnologias de Ponta
- Next.js 16 com Turbopack
- Tailwind CSS 4
- TypeScript 5
- React 19

### Qualidade do Código
- Tipagem completa
- Componentes reutilizáveis
- Código limpo e organizado
- Performance otimizada

### Pronto para Deploy
- Build testado e funcional
- Configuração Vercel ready
- SEO otimizado
- Documentação completa

---

**Desenvolvido por Anderson Henrique da Silva**
**IFSULDEMINAS - Ciência da Computação**
**Novembro 2025**

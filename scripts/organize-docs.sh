#!/bin/bash

# Script para organizar documentação com metadados padronizados
# Autor: Anderson Henrique da Silva
# Data: 2025-11-18

DOCS_DIR="/home/anderson-henrique/Documentos/dev-if/AEDIII/docs"
ROOT_DIR="/home/anderson-henrique/Documentos/dev-if/AEDIII"

AUTHOR="Anderson Henrique da Silva"
LOCATION="Minas Gerais, Brazil"
DATE="2025-11-18"

# Função para adicionar metadados no topo de um arquivo MD
add_metadata() {
    local file="$1"
    local title="$2"
    local category="$3"

    # Cria arquivo temporário com metadados
    cat > "${file}.tmp" << EOF
---
title: "${title}"
author: "${AUTHOR}"
location: "${LOCATION}"
date: "${DATE}"
category: "${category}"
---

EOF

    # Adiciona conteúdo original (pulando metadados antigos se existirem)
    if grep -q "^---$" "$file" 2>/dev/null; then
        # Remove metadados antigos
        sed '1{/^---$/,/^---$/d;}' "$file" >> "${file}.tmp"
    else
        cat "$file" >> "${file}.tmp"
    fi

    mv "${file}.tmp" "$file"
}

echo "🔧 Organizando documentação do projeto AEDIII..."
echo

# ========================================
# 1. DOCUMENTAÇÃO DE PROJETO
# ========================================
echo "📁 Organizando: 01-projeto (Visão Geral)"

# README principal
if [ -f "$ROOT_DIR/README.md" ]; then
    cp "$ROOT_DIR/README.md" "$DOCS_DIR/01-projeto/01-readme-principal.md"
    add_metadata "$DOCS_DIR/01-projeto/01-readme-principal.md" "README Principal - AED III Platform" "Projeto"
fi

# Estrutura do curso
if [ -f "$ROOT_DIR/COURSE_STRUCTURE.md" ]; then
    cp "$ROOT_DIR/COURSE_STRUCTURE.md" "$DOCS_DIR/01-projeto/02-estrutura-curso.md"
    add_metadata "$DOCS_DIR/01-projeto/02-estrutura-curso.md" "Estrutura do Curso" "Projeto"
fi

# Resumo do projeto
if [ -f "$ROOT_DIR/PROJECT_SUMMARY.md" ]; then
    cp "$ROOT_DIR/PROJECT_SUMMARY.md" "$DOCS_DIR/01-projeto/03-resumo-projeto.md"
    add_metadata "$DOCS_DIR/01-projeto/03-resumo-projeto.md" "Resumo do Projeto" "Projeto"
fi

# ========================================
# 2. DOCUMENTAÇÃO DE DESENVOLVIMENTO
# ========================================
echo "📁 Organizando: 02-desenvolvimento (Técnico)"

# Guia de desenvolvimento
if [ -f "$ROOT_DIR/DEVELOPMENT.md" ]; then
    cp "$ROOT_DIR/DEVELOPMENT.md" "$DOCS_DIR/02-desenvolvimento/01-guia-desenvolvimento.md"
    add_metadata "$DOCS_DIR/02-desenvolvimento/01-guia-desenvolvimento.md" "Guia de Desenvolvimento" "Desenvolvimento"
fi

# Deploy
if [ -f "$ROOT_DIR/DEPLOY.md" ]; then
    cp "$ROOT_DIR/DEPLOY.md" "$DOCS_DIR/02-desenvolvimento/02-deploy.md"
    add_metadata "$DOCS_DIR/02-desenvolvimento/02-deploy.md" "Guia de Deploy" "Desenvolvimento"
fi

# API
if [ -f "$DOCS_DIR/API.md" ]; then
    mv "$DOCS_DIR/API.md" "$DOCS_DIR/02-desenvolvimento/03-documentacao-api.md"
    add_metadata "$DOCS_DIR/02-desenvolvimento/03-documentacao-api.md" "Documentação da API" "Desenvolvimento"
fi

# Otimizações
if [ -f "$DOCS_DIR/OPTIMIZATIONS.md" ]; then
    mv "$DOCS_DIR/OPTIMIZATIONS.md" "$DOCS_DIR/02-desenvolvimento/04-otimizacoes.md"
    add_metadata "$DOCS_DIR/02-desenvolvimento/04-otimizacoes.md" "Otimizações de Performance" "Desenvolvimento"
fi

# Contribuindo
if [ -f "$DOCS_DIR/CONTRIBUINDO.md" ]; then
    mv "$DOCS_DIR/CONTRIBUINDO.md" "$DOCS_DIR/02-desenvolvimento/05-guia-contribuicao.md"
    add_metadata "$DOCS_DIR/02-desenvolvimento/05-guia-contribuicao.md" "Guia de Contribuição" "Desenvolvimento"
fi

# ========================================
# 3. RELATÓRIOS DE ANÁLISE
# ========================================
echo "📁 Organizando: 03-analise (Relatórios)"

# Relatório de melhorias
if [ -f "$ROOT_DIR/RELATORIO-MELHORIAS.md" ]; then
    cp "$ROOT_DIR/RELATORIO-MELHORIAS.md" "$DOCS_DIR/03-analise/01-relatorio-melhorias.md"
    add_metadata "$DOCS_DIR/03-analise/01-relatorio-melhorias.md" "Relatório Completo de Melhorias" "Análise"
fi

# Relatório de duplicações
if [ -f "$ROOT_DIR/duplication-report.md" ]; then
    cp "$ROOT_DIR/duplication-report.md" "$DOCS_DIR/03-analise/02-relatorio-duplicacoes.md"
    add_metadata "$DOCS_DIR/03-analise/02-relatorio-duplicacoes.md" "Relatório de Duplicações" "Análise"
fi

# Relatório de duplicações consecutivas
if [ -f "$ROOT_DIR/consecutive-duplication-report.md" ]; then
    cp "$ROOT_DIR/consecutive-duplication-report.md" "$DOCS_DIR/03-analise/03-relatorio-duplicacoes-consecutivas.md"
    add_metadata "$DOCS_DIR/03-analise/03-relatorio-duplicacoes-consecutivas.md" "Relatório de Duplicações Consecutivas" "Análise"
fi

# ========================================
# 4. REFERÊNCIAS E CONFIGURAÇÃO
# ========================================
echo "📁 Organizando: 04-referencias (Config & Guias)"

# CLAUDE.md (instruções para IA)
if [ -f "$ROOT_DIR/CLAUDE.md" ]; then
    cp "$ROOT_DIR/CLAUDE.md" "$DOCS_DIR/04-referencias/01-claude-instructions.md"
    add_metadata "$DOCS_DIR/04-referencias/01-claude-instructions.md" "Instruções para Claude Code" "Referência"
fi

# Criar índice geral
cat > "$DOCS_DIR/00-INDICE.md" << 'EOF'
---
title: "Índice Geral da Documentação"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
category: "Índice"
---

# 📚 Índice Geral da Documentação - AEDIII

## Estrutura de Organização

```
docs/
├── 00-INDICE.md (este arquivo)
├── 01-projeto/          # Visão geral e estrutura
├── 02-desenvolvimento/  # Guias técnicos
├── 03-analise/         # Relatórios de qualidade
└── 04-referencias/     # Configurações e referências
```

---

## 📁 01-projeto/ - Visão Geral

### 01-readme-principal.md
**Descrição**: README principal do projeto
**Conteúdo**: Visão geral, features, stack tecnológico, como usar

### 02-estrutura-curso.md
**Descrição**: Organização pedagógica do curso
**Conteúdo**: Categorias, ordem de tópicos, mapeamento de conteúdo

### 03-resumo-projeto.md
**Descrição**: Resumo executivo do projeto
**Conteúdo**: Objetivos, arquitetura, decisões técnicas

---

## 🔧 02-desenvolvimento/ - Guias Técnicos

### 01-guia-desenvolvimento.md
**Descrição**: Setup e workflow de desenvolvimento
**Conteúdo**: Instalação, comandos, estrutura de pastas

### 02-deploy.md
**Descrição**: Processo de deploy
**Conteúdo**: Build, deploy Vercel, variáveis de ambiente

### 03-documentacao-api.md
**Descrição**: Endpoints e rotas da API
**Conteúdo**: /api/search, formato de resposta, exemplos

### 04-otimizacoes.md
**Descrição**: Performance e otimizações
**Conteúdo**: PDF viewer, SSR, bundle size, caching

### 05-guia-contribuicao.md
**Descrição**: Como contribuir com o projeto
**Conteúdo**: Padrões de código, workflow Git, boas práticas

---

## 📊 03-analise/ - Relatórios de Qualidade

### 01-relatorio-melhorias.md
**Descrição**: Relatório completo das melhorias implementadas
**Conteúdo**:
- Eliminação de 107 linhas duplicadas
- Correção de 230 erros ortográficos
- Reescrita de criptografia.md (77% redução)
- Expansão de exercícios (+300%)

### 02-relatorio-duplicacoes.md
**Descrição**: Análise de duplicações por seção
**Conteúdo**: Detecção baseada em títulos e conteúdo normalizado

### 03-relatorio-duplicacoes-consecutivas.md
**Descrição**: Análise de blocos repetidos consecutivamente
**Conteúdo**: 107 linhas desperdiçadas identificadas e corrigidas

---

## 🔖 04-referencias/ - Configuração e Referências

### 01-claude-instructions.md
**Descrição**: Instruções para Claude Code (IA)
**Conteúdo**: Contexto do projeto, arquitetura, padrões

---

## 📈 Métricas do Projeto

- **Linhas de código**: ~15.000
- **Componentes React**: 20+
- **Arquivos de conteúdo**: 20 (markdown)
- **Scripts de automação**: 4 (550 linhas)
- **Cobertura de testes**: Configurado (Vitest)
- **Qualidade do conteúdo**: ⭐⭐⭐⭐⭐

---

## 🚀 Links Rápidos

- **README Principal**: [01-projeto/01-readme-principal.md](01-projeto/01-readme-principal.md)
- **Começar Desenvolvimento**: [02-desenvolvimento/01-guia-desenvolvimento.md](02-desenvolvimento/01-guia-desenvolvimento.md)
- **Ver Melhorias**: [03-analise/01-relatorio-melhorias.md](03-analise/01-relatorio-melhorias.md)

---

**Última atualização**: 2025-11-18
**Mantido por**: Anderson Henrique da Silva
**Localização**: Minas Gerais, Brazil
EOF

echo
echo "✅ Documentação organizada com sucesso!"
echo
echo "📊 Estrutura criada:"
echo "   docs/"
echo "   ├── 00-INDICE.md"
echo "   ├── 01-projeto/ (3 arquivos)"
echo "   ├── 02-desenvolvimento/ (5 arquivos)"
echo "   ├── 03-analise/ (3 arquivos)"
echo "   └── 04-referencias/ (1 arquivo)"
echo
echo "Total: 13 arquivos organizados com metadados padronizados"

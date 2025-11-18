---
title: "Guia de Deploy"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
category: "Desenvolvimento"
---

# Guia de Deploy - Vercel

Este guia mostra como fazer deploy do site AED III na Vercel.

## Pré-requisitos

1. Conta no GitHub
2. Conta na Vercel (pode usar login do GitHub)
3. Git instalado localmente

---

## Passo 1: Criar Repositório no GitHub

### 1.1 Via GitHub.com (Interface Web)

1. Acesse https://github.com
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Preencha:
   - **Nome**: `aed3-website`
   - **Descrição**: "Website da disciplina AED III - IFSULDEMINAS"
   - **Visibilidade**: Public ou Private (sua escolha)
5. NÃO marque "Initialize with README" (já temos um)
6. Clique em "Create repository"

### 1.2 Conectar Repositório Local ao GitHub

```bash
# No diretório aed3-website
git init
git add .
git commit -m "feat(init): create AED III course website

Initialize Next.js website for AED III course materials with:
- Next.js 16 with App Router and Turbopack
- TypeScript for type safety
- Tailwind CSS 4 for styling
- shadcn/ui components for modern UI
- React Markdown for content rendering
- 19 course materials organized in 6 categories
- Automated PDF to Markdown conversion system
- Responsive design with light/dark mode
- Static site generation for optimal performance"

git branch -M main
git remote add origin https://github.com/SEU_USUARIO/aed3-website.git
git push -u origin main
```

**Importante**: Substitua `SEU_USUARIO` pelo seu usuário do GitHub!

---

## Passo 2: Deploy na Vercel

### Opção A: Via Interface Web (Recomendado)

1. **Acesse a Vercel**
   - Vá para https://vercel.com
   - Faça login com sua conta GitHub

2. **Importar Projeto**
   - Clique em "Add New..."
   - Selecione "Project"
   - Escolha "Import Git Repository"
   - Selecione seu repositório `aed3-website`

3. **Configurar Deploy**
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `./` (deixe como está)
   - **Build Command**: `npm run build` (já configurado)
   - **Output Directory**: `.next` (já configurado)
   - **Install Command**: `npm install` (já configurado)

4. **Variáveis de Ambiente** (opcional)
   - Nenhuma necessária para este projeto

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde ~2 minutos
   - Seu site estará no ar!

### Opção B: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# No diretório aed3-website
vercel login

# Deploy
vercel

# Para deploy de produção
vercel --prod
```

---

## Passo 3: Configurações Pós-Deploy

### 3.1 Domínio Personalizado (Opcional)

1. No painel da Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio customizado
3. Configure os registros DNS conforme instruções

### 3.2 Configurar Deploy Automático

O deploy automático já está configurado! A cada push no GitHub:
- Branch `main` → Deploy em produção
- Outras branches → Preview deploy

### 3.3 Verificar Build

1. Acesse o painel da Vercel
2. Verifique se o build foi bem-sucedido
3. Teste o site no link fornecido

---

## URLs Esperadas

Após o deploy, você terá:

- **Produção**: `https://aed3-website.vercel.app`
- **Ou seu domínio**: `https://seu-dominio.com`

### Páginas Principais

- Homepage: `/`
- Listagem: `/content`
- Material individual: `/content/[slug]`
  - Exemplo: `/content/001_-_AVL`

---

## Comandos Git Úteis

### Adicionar Mudanças

```bash
# Ver status
git status

# Adicionar arquivos
git add .

# Commit (seguindo padrões profissionais)
git commit -m "feat(ui): add dark mode toggle

Implement dark mode support with:
- Theme provider configuration
- Toggle button in header
- Persistent user preference
- Smooth transitions between themes"

# Enviar para GitHub
git push
```

### Padrões de Commit (Conventional Commits)

```bash
# Novo recurso
git commit -m "feat(content): add search functionality"

# Correção de bug
git commit -m "fix(ui): correct mobile navigation alignment"

# Documentação
git commit -m "docs(readme): update installation instructions"

# Melhorias de estilo/formatação
git commit -m "style(components): format code with prettier"

# Refatoração
git commit -m "refactor(lib): optimize content loading logic"

# Testes
git commit -m "test(api): add unit tests for content parser"

# Performance
git commit -m "perf(build): reduce bundle size by 30%"
```

---

## Troubleshooting

### Erro de Build

**Problema**: Build falha na Vercel

**Solução**:
```bash
# Teste localmente primeiro
npm run build

# Se funcionar localmente, limpe cache da Vercel
# No painel: Settings > General > Clear Cache
```

### Erro de Memória

**Problema**: Out of memory durante build

**Solução**: Vercel fornece 3GB de RAM por padrão, suficiente para este projeto.

### Páginas 404

**Problema**: Algumas páginas retornam 404

**Solução**:
- Verifique se os arquivos Markdown estão em `lib/content/`
- Confirme que `CONTENT_MAPPING` em `lib/types.ts` está correto
- Rode `npm run build` localmente para testar

### Imagens Não Carregam

**Problema**: Imagens dos materiais não aparecem

**Solução**:
- Confirme que a pasta `lib/content/images/` está commitada
- Verifique os caminhos relativos no Markdown
- Use `![alt](../images/nome.png)` como padrão

---

## Monitoramento

### Analytics da Vercel

A Vercel fornece analytics gratuitos:
- Visualizações de página
- Tempo de carregamento
- Core Web Vitals
- Origem dos visitantes

Acesse: Painel da Vercel > Analytics

### Speed Insights

Monitore performance em tempo real:
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)

---

## Atualizações Futuras

Para adicionar novos materiais:

1. **Adicionar PDF ao diretório `docs/`**
2. **Executar script de extração**:
   ```bash
   cd ..  # Voltar para diretório raiz AEDIII
   source venv/bin/activate
   python3 scripts/extract_pdfs.py
   ```
3. **Copiar novos arquivos**:
   ```bash
   cd aed3-website
   cp -r ../content/* lib/content/
   ```
4. **Atualizar mapeamento** em `lib/types.ts`
5. **Commit e push**:
   ```bash
   git add .
   git commit -m "feat(content): add new course material"
   git push
   ```
6. **Deploy automático** acontecerá em ~2 minutos!

---

## Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

**Boa sorte com o deploy!** 🚀

Se tiver problemas, verifique os logs de build na Vercel.

---
title: "Documentação da API"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
category: "Desenvolvimento"
---

# Documentação da API

Esta documentação descreve as rotas de API disponíveis no projeto AED III.

## Base URL

```
Desenvolvimento: http://localhost:3000/api
Produção: https://seu-dominio.vercel.app/api
```

---

## Endpoints

### 🔍 Busca de Conteúdo

Realiza busca em tempo real no conteúdo do curso.

#### `GET /api/search`

**Parâmetros Query**:

| Parâmetro  | Tipo   | Obrigatório | Descrição                          |
|------------|--------|-------------|------------------------------------|
| `q`        | string | Sim         | Termo de busca                     |
| `category` | string | Não         | Filtrar por categoria específica   |
| `limit`    | number | Não         | Limite de resultados (padrão: 10)  |

**Categorias válidas**:
- `arvores` - Árvores Balanceadas
- `hash` - Tabelas Hash
- `arquivos` - Manipulação de Arquivos
- `compressao` - Compressão e Criptografia
- `algoritmos` - Algoritmos e Técnicas
- `exercicios` - Exercícios

**Exemplo de Requisição**:

```bash
# Busca simples
curl "http://localhost:3000/api/search?q=AVL"

# Busca com filtro de categoria
curl "http://localhost:3000/api/search?q=balanceamento&category=arvores"

# Busca com limite personalizado
curl "http://localhost:3000/api/search?q=hash&limit=5"
```

**Resposta de Sucesso** (200 OK):

```json
{
  "results": [
    {
      "slug": "001_-_AVL",
      "title": "Árvores AVL",
      "excerpt": "...contexto com termo de busca destacado...",
      "category": "arvores"
    },
    {
      "slug": "002_-_AVL-Implementacao",
      "title": "Implementação AVL",
      "excerpt": "...outro trecho relevante...",
      "category": "arvores"
    }
  ],
  "count": 2,
  "query": "AVL"
}
```

**Resposta sem Resultados** (200 OK):

```json
{
  "results": [],
  "count": 0,
  "query": "termo_inexistente"
}
```

**Resposta de Erro** (400 Bad Request):

```json
{
  "error": "Parâmetro 'q' é obrigatório"
}
```

**Códigos de Status**:
- `200` - Sucesso (com ou sem resultados)
- `400` - Requisição inválida (falta parâmetro obrigatório)
- `500` - Erro interno do servidor

**Características**:
- ✅ Busca case-insensitive
- ✅ Busca em títulos e conteúdo
- ✅ Retorna excertos com contexto
- ✅ Limitado a 10 resultados por padrão
- ✅ Cache automático de 5 minutos

---

### 📄 Manifest PWA

Retorna o manifesto da aplicação para PWA.

#### `GET /api/manifest`

**Parâmetros**: Nenhum

**Exemplo de Requisição**:

```bash
curl "http://localhost:3000/api/manifest"
```

**Resposta de Sucesso** (200 OK):

```json
{
  "name": "AED III - IFSULDEMINAS",
  "short_name": "AED III",
  "description": "Material didático de Algoritmos e Estruturas de Dados III",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2D8C46",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Headers**:
- `Content-Type: application/json`
- `Cache-Control: public, max-age=86400` (24 horas)

---

## Uso com JavaScript

### Busca com Fetch API

```javascript
// Busca simples
async function buscarConteudo(termo) {
  const url = new URL('/api/search', window.location.origin);
  url.searchParams.set('q', termo);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      console.log(`Encontrados ${data.count} resultados`);
      return data.results;
    } else {
      console.log('Nenhum resultado encontrado');
      return [];
    }
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
}

// Uso
const resultados = await buscarConteudo('árvore AVL');
```

### Busca com Filtros

```javascript
async function buscarPorCategoria(termo, categoria) {
  const url = new URL('/api/search', window.location.origin);
  url.searchParams.set('q', termo);
  url.searchParams.set('category', categoria);

  const response = await fetch(url);
  return await response.json();
}

// Buscar apenas em árvores
const arvores = await buscarPorCategoria('balanceamento', 'arvores');
```

### Com Debounce (Recomendado)

```typescript
import { useState, useEffect } from 'react';

function useSearch(query: string, delay: number = 500) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      const url = new URL('/api/search', window.location.origin);
      url.searchParams.set('q', query);

      try {
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [query, delay]);

  return { results, loading };
}
```

---

## Rate Limiting

Atualmente **não há rate limiting** implementado nas rotas de API.

**Recomendações para uso em produção**:
- Implementar debounce no client-side (delay de 300-500ms)
- Cache de resultados no localStorage
- Limite de requisições por IP (futura implementação)

---

## Boas Práticas

### 1. Use Debounce

Evite requisições em cada tecla digitada:

```javascript
// ❌ Ruim: Requisição a cada tecla
<input onChange={(e) => buscar(e.target.value)} />

// ✅ Bom: Com debounce
const debouncedSearch = useMemo(
  () => debounce((value) => buscar(value), 500),
  []
);
<input onChange={(e) => debouncedSearch(e.target.value)} />
```

### 2. Cache Resultados

```javascript
const cache = new Map();

async function buscarComCache(termo) {
  if (cache.has(termo)) {
    return cache.get(termo);
  }

  const resultados = await buscar(termo);
  cache.set(termo, resultados);

  // Limpar cache antigo (5 minutos)
  setTimeout(() => cache.delete(termo), 5 * 60 * 1000);

  return resultados;
}
```

### 3. Trate Erros Gracefully

```javascript
async function buscarSafe(termo) {
  try {
    return await buscar(termo);
  } catch (error) {
    console.error('Erro na busca:', error);
    // Retornar array vazio ao invés de quebrar a UI
    return [];
  }
}
```

### 4. Cancele Requisições Pendentes

```javascript
let abortController = null;

async function buscarCancelavel(termo) {
  // Cancela requisição anterior se existir
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();

  try {
    const response = await fetch(`/api/search?q=${termo}`, {
      signal: abortController.signal
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Requisição cancelada');
    }
    throw error;
  }
}
```

---

## Tipos TypeScript

```typescript
// Tipos para a API de busca
interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

interface SearchResponse {
  results: SearchResult[];
  count: number;
  query: string;
}

interface SearchError {
  error: string;
}

// Uso
async function buscar(termo: string): Promise<SearchResponse> {
  const url = new URL('/api/search', window.location.origin);
  url.searchParams.set('q', termo);

  const response = await fetch(url);

  if (!response.ok) {
    const error: SearchError = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}
```

---

## Futuras Implementações

Planejado para próximas versões:

- [ ] **Autocomplete** - Sugestões enquanto digita
- [ ] **Filtros avançados** - Por autor, data, tipo de conteúdo
- [ ] **Ordenação** - Por relevância, data, alfabético
- [ ] **Highlights** - Destaque dos termos encontrados
- [ ] **Paginação** - Para resultados maiores que 10
- [ ] **Analytics** - Termos mais buscados
- [ ] **Rate limiting** - Proteção contra abuso

---

## Suporte

Problemas com a API?
- Abra uma [Issue](../../issues)
- Consulte o [Guia de Contribuição](./CONTRIBUINDO.md)
- Veja exemplos de uso nos componentes do projeto

---

**Documentação atualizada em:** 2025-01-18

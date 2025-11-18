#!/usr/bin/env node

/**
 * Script para adicionar seções de pré-requisitos nos arquivos de conteúdo
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../lib/content');

// Definição de pré-requisitos para cada arquivo
const PREREQUISITES = {
  '002_-_AVL-Implementacao.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar a implementação de Árvores AVL, você deve ter estudado:\n\n- **Árvores AVL - Teoria** (arquivo anterior): Fator de balanceamento, rotações\n- **Programação em C/C++**: Structs, ponteiros, alocação dinâmica\n- **Recursão avançada**: Funções recursivas com múltiplas chamadas\n\n**Tempo estimado de estudo**: 3-4 horas\n\n---\n\n',
    insertAfter: /^# .+$/m
  },
  '003_-_Arvore_Rubro_Negra.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar Árvores Rubro-Negra, certifique-se de dominar:\n\n- **Árvores AVL completas** (teoria e implementação)\n- **Conceito de invariantes** em estruturas de dados\n- **Análise de complexidade amortizada**\n- **Propriedades de árvores balanceadas**\n\n**Tempo estimado de estudo**: 5-7 horas (conteúdo avançado)\n\n---\n\n',
    insertAfter: /^# .+$/m
  },
  'backtracking.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar Backtracking, você deve dominar:\n\n- **Recursão**: Chamadas recursivas, casos base, pilha de execução\n- **Estruturas de dados básicas**: Arrays multidimensionais (matrizes)\n- **Lógica de programação**: Condicionais, loops\n- **Conceito de espaço de busca**: Árvore de decisões\n\n**Tempo estimado de estudo**: 3-4 horas\n\n---\n\n',
    insertAfter: /^# .+$/m
  },
  'mochila.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar o Problema da Mochila, certifique-se de conhecer:\n\n- **Algoritmos gulosos**: Estratégia de escolha local ótima\n- **Programação dinâmica**: Conceitos básicos de otimização\n- **Ordenação de vetores**: Ordenação por múltiplos critérios\n- **Análise de complexidade**: Comparação entre abordagens\n\n**Tempo estimado de estudo**: 2-3 horas\n\n---\n\n',
    insertAfter: /^# .+$/m
  },
  'Tabela Hash.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar Tabelas Hash, você deve dominar:\n\n- **Funções matemáticas**: Operações módulo, divisão inteira\n- **Vetores (arrays)**: Acesso direto por índice\n- **Listas encadeadas**: Tratamento de colisões por encadeamento\n- **Análise de complexidade**: Melhor caso, pior caso, caso médio\n\n**Tempo estimado de estudo**: 3-4 horas\n\n---\n\n',
    insertAfter: /^# .+$/m
  },
  'estruturas1.md': {
    title: '## 📚 Pré-requisitos\n\nAntes de estudar Estruturas C++ STL, certifique-se de conhecer:\n\n- **C++ básico**: Sintaxe, tipos de dados, funções\n- **Templates em C++**: Conceito de tipos genéricos\n- **Vetores tradicionais**: Arrays estáticos em C/C++\n- **Compilação C++**: Uso de `#include` e namespaces\n\n**Tempo estimado de estudo**: 2 horas\n\n---\n\n',
    insertAfter: /^# .+$/m
  }
};

function addPrerequisites(filename) {
  const filePath = path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filename}: Arquivo não encontrado`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const prereqConfig = PREREQUISITES[filename];

  // Verifica se já tem pré-requisitos
  if (content.includes('## 📚 Pré-requisitos')) {
    console.log(`ℹ️  ${filename}: Já possui seção de pré-requisitos`);
    return false;
  }

  // Encontra a posição de inserção
  const match = content.match(prereqConfig.insertAfter);
  if (!match) {
    console.log(`⚠️  ${filename}: Não foi possível encontrar o ponto de inserção`);
    return false;
  }

  const insertPosition = match.index + match[0].length;
  const newContent = content.slice(0, insertPosition) + '\n\n' + prereqConfig.title + content.slice(insertPosition);

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ ${filename}: Pré-requisitos adicionados`);
  return true;
}

async function addAllPrerequisites() {
  console.log('📚 Adicionando seções de pré-requisitos...\n');

  let added = 0;
  let skipped = 0;

  for (const filename of Object.keys(PREREQUISITES)) {
    if (addPrerequisites(filename)) {
      added++;
    } else {
      skipped++;
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   - Pré-requisitos adicionados: ${added}`);
  console.log(`   - Arquivos já tinham ou não encontrados: ${skipped}`);
}

addAllPrerequisites().catch(console.error);

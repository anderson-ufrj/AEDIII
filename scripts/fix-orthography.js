#!/usr/bin/env node

/**
 * Script para corrigir problemas ortográficos e de codificação
 * nos arquivos de conteúdo Markdown
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../lib/content');

// Mapeamento de correções
const CORRECTIONS = {
  // Correções de ligatura fi (problema comum em PDFs)
  'deﬁn': 'defin',
  'veriﬁ': 'verifi',
  'eﬁc': 'efic',
  'ﬁlh': 'filh',
  'ﬁnal': 'final',
  'ﬁc': 'fic',
  'ﬁx': 'fix',
  'modiﬁ': 'modifi',
  'identiﬁ': 'identifi',
  'classiﬁ': 'classifi',
  'signiﬁ': 'signifi',

  // Typos comuns
  'elicien': 'eficien',
  'efecient': 'eficient',

  // Padronização de terminologia
  'árvore binária de busca': 'árvore binária de busca',  // Mantém, mas documenta
  'árvores binária de busca': 'árvores binárias de busca',  // Fix plural
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changes = 0;
  let changedPatterns = [];

  // Aplica cada correção
  for (const [wrong, correct] of Object.entries(CORRECTIONS)) {
    const regex = new RegExp(wrong, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, correct);
      changes += matches.length;
      changedPatterns.push(`${wrong} → ${correct} (${matches.length}x)`);
    }
  }

  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { changes, patterns: changedPatterns };
  }

  return null;
}

async function fixAllFiles() {
  console.log('🔧 Corrigindo ortografia e codificação em lib/content/...\n');

  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md') && f !== '009_-_Criptografia.md')  // Skip corrupted file
    .sort();

  let totalChanges = 0;
  let filesFixed = 0;

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const result = fixFile(filePath);

    if (result) {
      filesFixed++;
      totalChanges += result.changes;
      console.log(`✅ ${file}:`);
      result.patterns.forEach(p => console.log(`   - ${p}`));
      console.log();
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   - Arquivos corrigidos: ${filesFixed}`);
  console.log(`   - Total de correções: ${totalChanges}`);
  console.log(`   - Arquivos ignorados: 009_-_Criptografia.md (needs manual rewrite)`);
}

fixAllFiles().catch(console.error);

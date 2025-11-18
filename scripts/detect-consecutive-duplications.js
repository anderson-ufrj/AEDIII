#!/usr/bin/env node

/**
 * Script para detectar blocos de texto consecutivos duplicados
 * Detecta quando o mesmo conteúdo aparece múltiplas vezes seguidas
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../lib/content');
const OUTPUT_FILE = path.join(__dirname, '../consecutive-duplication-report.md');

// Mínimo de linhas para considerar um bloco significativo
const MIN_BLOCK_LINES = 5;
const MIN_BLOCK_CHARS = 200;

function normalizeText(text) {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

function extractBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let currentBlock = [];
  let startLine = 0;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Separa blocos por linhas vazias ou títulos markdown
    if (trimmed === '' || line.match(/^#{1,6}\s+/) || line.match(/^---$/)) {
      if (currentBlock.length >= MIN_BLOCK_LINES) {
        const text = currentBlock.join('\n');
        if (text.length >= MIN_BLOCK_CHARS) {
          blocks.push({
            text,
            normalized: normalizeText(text),
            startLine,
            endLine: index - 1,
            lineCount: currentBlock.length
          });
        }
      }
      currentBlock = [];
      startLine = index + 1;
    } else {
      currentBlock.push(line);
    }
  });

  // Último bloco
  if (currentBlock.length >= MIN_BLOCK_LINES) {
    const text = currentBlock.join('\n');
    if (text.length >= MIN_BLOCK_CHARS) {
      blocks.push({
        text,
        normalized: normalizeText(text),
        startLine,
        endLine: lines.length - 1,
        lineCount: currentBlock.length
      });
    }
  }

  return blocks;
}

function findConsecutiveDuplications(blocks, filename) {
  const duplications = [];

  for (let i = 0; i < blocks.length - 1; i++) {
    const current = blocks[i];
    const consecutiveDuplicates = [i];

    // Procura blocos consecutivos idênticos
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[j].normalized === current.normalized) {
        consecutiveDuplicates.push(j);
      } else {
        break; // Para de procurar se encontrar um diferente
      }
    }

    if (consecutiveDuplicates.length > 1) {
      duplications.push({
        filename,
        count: consecutiveDuplicates.length,
        preview: current.text.substring(0, 150) + '...',
        occurrences: consecutiveDuplicates.map(idx => ({
          blockIndex: idx,
          lines: `${blocks[idx].startLine + 1}-${blocks[idx].endLine + 1}`,
          lineCount: blocks[idx].lineCount
        })),
        totalLines: consecutiveDuplicates.reduce((sum, idx) => sum + blocks[idx].lineCount, 0)
      });

      // Pula os blocos já processados
      i += consecutiveDuplicates.length - 1;
    }
  }

  return duplications;
}

async function analyzeAllFiles() {
  console.log('🔍 Analisando duplicações consecutivas em lib/content/...\n');

  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  let report = '';
  let totalDuplications = 0;
  let totalWastedLines = 0;
  const problemFiles = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const blocks = extractBlocks(content);
    const duplications = findConsecutiveDuplications(blocks, file);

    if (duplications.length > 0) {
      const wastedLines = duplications.reduce((sum, d) => sum + (d.totalLines - d.occurrences[0].lineCount), 0);
      totalDuplications += duplications.length;
      totalWastedLines += wastedLines;
      problemFiles.push({ file, count: duplications.length, wastedLines });

      report += `## 🔴 ${file}\n\n`;
      report += `**Grupos de duplicação:** ${duplications.length}\n`;
      report += `**Linhas desperdiçadas:** ${wastedLines}\n\n`;

      duplications.forEach((dup, idx) => {
        report += `### Grupo #${idx + 1} (${dup.count}x repetições)\n\n`;
        report += `**Preview:**\n\`\`\`\n${dup.preview}\n\`\`\`\n\n`;
        report += `**Ocorrências:**\n`;
        dup.occurrences.forEach((occ, i) => {
          report += `${i + 1}. Linhas ${occ.lines} (${occ.lineCount} linhas)\n`;
        });
        report += `\n**⚠️ Economia potencial:** Remover ${dup.count - 1} repetições = ${dup.totalLines - dup.occurrences[0].lineCount} linhas\n\n`;
      });

      report += `---\n\n`;
    }
  }

  // Gera relatório completo com resumo
  const finalReport = `# 📊 Relatório de Duplicações Consecutivas\n\n` +
    `**Data:** ${new Date().toLocaleString('pt-BR')}\n\n` +
    `**Total de arquivos analisados:** ${files.length}\n` +
    `**Arquivos com duplicações:** ${problemFiles.length}\n` +
    `**Total de grupos duplicados:** ${totalDuplications}\n` +
    `**Total de linhas desperdiçadas:** ${totalWastedLines}\n\n` +
    `## 🎯 Resumo Executivo\n\n` +
    (problemFiles.length > 0
      ? `Os seguintes arquivos contêm blocos duplicados consecutivamente:\n\n` +
        problemFiles.map(f => `- **${f.file}**: ${f.count} grupos (${f.wastedLines} linhas desperdiçadas)`).join('\n') + '\n\n' +
        `### 📉 Top 5 Arquivos Mais Problemáticos\n\n` +
        problemFiles
          .sort((a, b) => b.wastedLines - a.wastedLines)
          .slice(0, 5)
          .map((f, i) => `${i + 1}. **${f.file}**: ${f.wastedLines} linhas desperdiçadas`)
          .join('\n') + '\n\n'
      : '✅ Nenhuma duplicação consecutiva encontrada!\n\n') +
    `---\n\n` +
    report;

  fs.writeFileSync(OUTPUT_FILE, finalReport);

  console.log(`✅ Análise concluída!`);
  console.log(`📄 Relatório salvo em: ${OUTPUT_FILE}`);
  console.log(`\n📊 Estatísticas:`);
  console.log(`   - Arquivos analisados: ${files.length}`);
  console.log(`   - Arquivos com problemas: ${problemFiles.length}`);
  console.log(`   - Grupos de duplicação: ${totalDuplications}`);
  console.log(`   - Linhas desperdiçadas: ${totalWastedLines}`);

  if (problemFiles.length > 0) {
    console.log(`\n🔴 Top 5 arquivos mais problemáticos:`);
    problemFiles
      .sort((a, b) => b.wastedLines - a.wastedLines)
      .slice(0, 5)
      .forEach(f => console.log(`   - ${f.file}: ${f.wastedLines} linhas`));
  }

  return { problemFiles, totalWastedLines };
}

analyzeAllFiles().catch(console.error);

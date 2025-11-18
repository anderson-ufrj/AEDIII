#!/usr/bin/env node

/**
 * Script para detectar seções duplicadas em arquivos Markdown
 * Analisa todos os arquivos .md em lib/content/ e identifica repetições
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../lib/content');
const OUTPUT_FILE = path.join(__dirname, '../duplication-report.md');

// Função para normalizar texto (remove espaços extras, normaliza)
function normalizeText(text) {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

// Função para extrair seções de um arquivo markdown
function extractSections(content, filename) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = { title: '', content: [], startLine: 0 };

  lines.forEach((line, index) => {
    // Detecta títulos (# Título, ## Título, etc)
    if (line.match(/^#{1,6}\s+/)) {
      if (currentSection.content.length > 0) {
        sections.push({
          ...currentSection,
          content: currentSection.content.join('\n'),
          endLine: index - 1,
          normalized: normalizeText(currentSection.content.join('\n'))
        });
      }
      currentSection = {
        title: line.replace(/^#+\s+/, '').trim(),
        content: [],
        startLine: index
      };
    } else {
      currentSection.content.push(line);
    }
  });

  // Adiciona última seção
  if (currentSection.content.length > 0) {
    sections.push({
      ...currentSection,
      content: currentSection.content.join('\n'),
      endLine: lines.length - 1,
      normalized: normalizeText(currentSection.content.join('\n'))
    });
  }

  return sections;
}

// Função para detectar duplicações dentro de um arquivo
function findDuplicationsInFile(sections, filename) {
  const duplications = [];
  const seen = new Map();

  sections.forEach((section, index) => {
    const normalized = section.normalized;

    // Ignora seções muito pequenas (menos de 50 caracteres)
    if (normalized.length < 50) return;

    if (seen.has(normalized)) {
      const original = seen.get(normalized);
      duplications.push({
        filename,
        title: section.title || '(sem título)',
        original: {
          index: original.index,
          lines: `${original.startLine + 1}-${original.endLine + 1}`
        },
        duplicate: {
          index,
          lines: `${section.startLine + 1}-${section.endLine + 1}`
        },
        contentLength: normalized.length
      });
    } else {
      seen.set(normalized, {
        index,
        startLine: section.startLine,
        endLine: section.endLine
      });
    }
  });

  return duplications;
}

// Função principal
async function analyzeAllFiles() {
  console.log('🔍 Analisando arquivos markdown em lib/content/...\n');

  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  let report = `# 📊 Relatório de Duplicações de Conteúdo\n\n`;
  report += `**Data:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  report += `**Total de arquivos analisados:** ${files.length}\n\n`;
  report += `---\n\n`;

  let totalDuplications = 0;
  const problemFiles = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const sections = extractSections(content, file);
    const duplications = findDuplicationsInFile(sections, file);

    if (duplications.length > 0) {
      totalDuplications += duplications.length;
      problemFiles.push({ file, count: duplications.length });

      report += `## 🔴 ${file}\n\n`;
      report += `**Duplicações encontradas:** ${duplications.length}\n\n`;

      duplications.forEach((dup, idx) => {
        report += `### Duplicação #${idx + 1}\n\n`;
        report += `- **Título:** ${dup.title}\n`;
        report += `- **Original:** Linhas ${dup.original.lines}\n`;
        report += `- **Duplicada:** Linhas ${dup.duplicate.lines}\n`;
        report += `- **Tamanho:** ${dup.contentLength} caracteres\n\n`;
      });

      report += `---\n\n`;
    }
  }

  // Resumo
  report = `# 📊 Relatório de Duplicações de Conteúdo\n\n` +
           `**Data:** ${new Date().toLocaleString('pt-BR')}\n\n` +
           `**Total de arquivos analisados:** ${files.length}\n` +
           `**Arquivos com duplicações:** ${problemFiles.length}\n` +
           `**Total de duplicações:** ${totalDuplications}\n\n` +
           `## 🎯 Resumo Executivo\n\n` +
           (problemFiles.length > 0
             ? `Os seguintes arquivos contêm conteúdo duplicado:\n\n` +
               problemFiles.map(f => `- **${f.file}**: ${f.count} duplicações`).join('\n') + '\n\n'
             : '✅ Nenhuma duplicação encontrada!\n\n') +
           `---\n\n` +
           report;

  // Salva relatório
  fs.writeFileSync(OUTPUT_FILE, report);

  console.log(`✅ Análise concluída!`);
  console.log(`📄 Relatório salvo em: ${OUTPUT_FILE}`);
  console.log(`\n📊 Estatísticas:`);
  console.log(`   - Arquivos analisados: ${files.length}`);
  console.log(`   - Arquivos com problemas: ${problemFiles.length}`);
  console.log(`   - Total de duplicações: ${totalDuplications}`);

  if (problemFiles.length > 0) {
    console.log(`\n🔴 Arquivos mais problemáticos:`);
    problemFiles
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .forEach(f => console.log(`   - ${f.file}: ${f.count} duplicações`));
  }
}

// Executa
analyzeAllFiles().catch(console.error);

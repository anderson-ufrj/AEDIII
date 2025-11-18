/**
 * Utilitário para exportar anotações de PDF em diferentes formatos
 */

export interface Anotacao {
  id: string;
  pagina: number;
  tipo: 'desenho' | 'destaque' | 'texto';
  dados: any;
  criado: number;
}

/**
 * Exporta anotações para JSON
 */
export function exportarParaJSON(anotacoes: Anotacao[], nomeArquivo: string = 'anotacoes.json'): void {
  const json = JSON.stringify(anotacoes, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  baixarArquivo(blob, nomeArquivo);
}

/**
 * Exporta anotações para CSV
 */
export function exportarParaCSV(anotacoes: Anotacao[], nomeArquivo: string = 'anotacoes.csv'): void {
  const cabecalho = 'ID,Página,Tipo,Data\n';
  const linhas = anotacoes.map((a) =>
    `${a.id},${a.pagina},${a.tipo},${new Date(a.criado).toLocaleString()}`
  ).join('\n');

  const csv = cabecalho + linhas;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  baixarArquivo(blob, nomeArquivo);
}

/**
 * Exporta anotações para texto formatado
 */
export function exportarParaTXT(anotacoes: Anotacao[], nomeArquivo: string = 'anotacoes.txt'): void {
  const texto = anotacoes.map((a) =>
    `[Página ${a.pagina}] ${a.tipo.toUpperCase()}\nData: ${new Date(a.criado).toLocaleString()}\n---`
  ).join('\n\n');

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
  baixarArquivo(blob, nomeArquivo);
}

function baixarArquivo(blob: Blob, nome: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

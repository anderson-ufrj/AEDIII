import { useEffect } from 'react';

/**
 * Hook para registrar atalhos de teclado globais
 */
export function useAtalhosTeclado() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Busca
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="search"]')?.focus();
      }

      // Ctrl/Cmd + /: Atalhos
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        mostrarAtalhos();
      }

      // Esc: Fechar modais
      if (e.key === 'Escape') {
        fecharModais();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}

function mostrarAtalhos() {
  console.log('Atalhos disponíveis:');
  console.log('Ctrl/Cmd + K: Buscar');
  console.log('Ctrl/Cmd + /: Ver atalhos');
  console.log('Alt + ←/→: Navegar entre conteúdos');
  console.log('Esc: Fechar modais');
}

function fecharModais() {
  const botaoFechar = document.querySelector<HTMLButtonElement>('[aria-label*="Fechar"]');
  botaoFechar?.click();
}

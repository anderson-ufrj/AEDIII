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
  // Dispara evento customizado para exibir modal de atalhos
  const event = new CustomEvent('show-keyboard-shortcuts', {
    detail: {
      shortcuts: [
        { keys: 'Ctrl/Cmd + K', action: 'Buscar' },
        { keys: 'Ctrl/Cmd + /', action: 'Ver atalhos' },
        { keys: 'Alt + ←/→', action: 'Navegar entre conteúdos' },
        { keys: 'Esc', action: 'Fechar modais' },
      ],
    },
  });
  window.dispatchEvent(event);
}

function fecharModais() {
  const botaoFechar = document.querySelector<HTMLButtonElement>('[aria-label*="Fechar"]');
  botaoFechar?.click();
}

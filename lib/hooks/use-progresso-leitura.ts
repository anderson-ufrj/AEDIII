import { useState, useEffect } from 'react';

/**
 * Hook para rastrear progresso de leitura de um conteúdo
 */
export function useProgressoLeitura(slug: string) {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      const rolado = window.scrollY;
      const porcentagem = Math.round((rolado / altura) * 100);

      setProgresso(Math.min(100, Math.max(0, porcentagem)));

      // Salvar no localStorage
      if (porcentagem > 10) {
        localStorage.setItem(`progresso_${slug}`, porcentagem.toString());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calcular inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Carregar progresso salvo
  useEffect(() => {
    const salvo = localStorage.getItem(`progresso_${slug}`);
    if (salvo) {
      const porcentagem = parseInt(salvo, 10);
      console.log(`Última leitura: ${porcentagem}% concluído`);
    }
  }, [slug]);

  return progresso;
}

/**
 * Obter todos os progressos salvos
 */
export function obterTodosProgressos(): Record<string, number> {
  const progressos: Record<string, number> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave?.startsWith('progresso_')) {
      const slug = chave.replace('progresso_', '');
      const valor = localStorage.getItem(chave);
      if (valor) {
        progressos[slug] = parseInt(valor, 10);
      }
    }
  }

  return progressos;
}

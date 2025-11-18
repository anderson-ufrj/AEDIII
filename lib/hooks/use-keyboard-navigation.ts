import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardNavigationOptions {
  enabled?: boolean;
  previousSlug?: string | null;
  nextSlug?: string | null;
}

/**
 * Hook para navegação por teclado entre conteúdos
 *
 * @param options - Configurações de navegação
 * @returns void
 *
 * Atalhos suportados:
 * - Alt + ← : Conteúdo anterior
 * - Alt + → : Próximo conteúdo
 * - Alt + H : Página inicial
 * - Alt + C : Lista de conteúdos
 * - Alt + S : Focar na busca
 */
export function useKeyboardNavigation({
  enabled = true,
  previousSlug = null,
  nextSlug = null
}: KeyboardNavigationOptions = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Verificar se Alt está pressionado
      if (!event.altKey) return;

      // Prevenir comportamento padrão
      const preventDefault = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      switch (event.key) {
        case 'ArrowLeft':
          // Alt + ← : Voltar para conteúdo anterior
          if (previousSlug) {
            preventDefault();
            router.push(`/content/${previousSlug}`);
          }
          break;

        case 'ArrowRight':
          // Alt + → : Avançar para próximo conteúdo
          if (nextSlug) {
            preventDefault();
            router.push(`/content/${nextSlug}`);
          }
          break;

        case 'h':
        case 'H':
          // Alt + H : Ir para página inicial
          preventDefault();
          router.push('/');
          break;

        case 'c':
        case 'C':
          // Alt + C : Ir para lista de conteúdos
          preventDefault();
          router.push('/content');
          break;

        case 's':
        case 'S':
          // Alt + S : Focar no campo de busca
          preventDefault();
          const searchInput = document.querySelector<HTMLInputElement>('input[type="search"]');
          searchInput?.focus();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, previousSlug, nextSlug, router]);
}

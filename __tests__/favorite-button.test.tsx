import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoriteButton } from '@/components/favorite-button';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock safe localStorage utilities
vi.mock('@/lib/utils/local-storage', () => ({
  safeLocalStorageGet: vi.fn((key: string, defaultValue: unknown) => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  }),
  safeLocalStorageSet: vi.fn((key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }),
}));

describe('FavoriteButton', () => {
  const mockSlug = 'test-content';
  const mockTitle = 'Conteúdo de Teste';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve renderizar botão de favorito', async () => {
    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('deve exibir texto "Favoritar" inicialmente', async () => {
    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByText('Favoritar')).toBeInTheDocument();
    });
  });

  it('deve adicionar aos favoritos ao clicar', async () => {
    const user = userEvent.setup();
    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      expect(favorites).toContain(mockSlug);
    });
  });

  it('deve remover dos favoritos ao clicar novamente', async () => {
    localStorage.setItem('favorites', JSON.stringify([mockSlug]));

    const user = userEvent.setup();
    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByText('Favoritado')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      expect(favorites).not.toContain(mockSlug);
    });
  });

  it('deve alternar texto ao favoritar', async () => {
    const user = userEvent.setup();
    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByText('Favoritar')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');

    // Após clicar - deve mudar para Favoritado
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('Favoritado')).toBeInTheDocument();
    });

    // Após clicar novamente - deve voltar para Favoritar
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('Favoritar')).toBeInTheDocument();
    });
  });

  it('deve carregar estado inicial do localStorage', async () => {
    localStorage.setItem('favorites', JSON.stringify([mockSlug]));

    render(<FavoriteButton contentSlug={mockSlug} contentTitle={mockTitle} />);

    await waitFor(() => {
      expect(screen.getByText('Favoritado')).toBeInTheDocument();
    });
  });

  it('deve renderizar variante icon com title correto', async () => {
    render(
      <FavoriteButton
        contentSlug={mockSlug}
        contentTitle={mockTitle}
        variant="icon"
      />
    );

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Adicionar aos favoritos');
    });
  });

  it('deve atualizar title na variante icon quando favoritado', async () => {
    localStorage.setItem('favorites', JSON.stringify([mockSlug]));

    render(
      <FavoriteButton
        contentSlug={mockSlug}
        contentTitle={mockTitle}
        variant="icon"
      />
    );

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Remover dos favoritos');
    });
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoriteButton } from '@/components/favorite-button';

describe('FavoriteButton', () => {
  const mockSlug = 'test-content';
  const mockTitle = 'Conteúdo de Teste';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve renderizar botão de favorito', () => {
    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve exibir ícone não favoritado inicialmente', () => {
    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Adicionar'));
  });

  it('deve adicionar aos favoritos ao clicar', async () => {
    const user = userEvent.setup();
    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).toContainEqual({ slug: mockSlug, title: mockTitle });
  });

  it('deve remover dos favoritos ao clicar novamente', async () => {
    localStorage.setItem('favorites', JSON.stringify([{ slug: mockSlug, title: mockTitle }]));

    const user = userEvent.setup();
    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).not.toContainEqual({ slug: mockSlug, title: mockTitle });
  });

  it('deve alternar estado visual ao favoritar', async () => {
    const user = userEvent.setup();
    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);

    const button = screen.getByRole('button');

    // Estado inicial
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Adicionar'));

    // Após clicar
    await user.click(button);
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Remover'));

    // Após clicar novamente
    await user.click(button);
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Adicionar'));
  });

  it('deve carregar estado inicial do localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([{ slug: mockSlug, title: mockTitle }]));

    render(<FavoriteButton slug={mockSlug} title={mockTitle} />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Remover'));
  });
});

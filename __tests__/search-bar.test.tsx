import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/search-bar';

// Mock do fetch global
global.fetch = vi.fn();

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar campo de busca', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  });

  it('deve permitir digitação no campo de busca', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await user.type(input, 'árvore AVL');

    expect(input).toHaveValue('árvore AVL');
  });

  it('deve realizar busca ao pressionar Enter', async () => {
    const mockResults = [
      { slug: 'avl', title: 'Árvores AVL', excerpt: 'Conteúdo sobre AVL' }
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResults
    });

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await user.type(input, 'AVL{Enter}');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/search?q=AVL')
      );
    });
  });

  it('deve exibir mensagem quando não há resultados', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await user.type(input, 'termo inexistente{Enter}');

    await waitFor(() => {
      expect(screen.getByText(/nenhum resultado/i)).toBeInTheDocument();
    });
  });

  it('deve limpar busca ao clicar no botão limpar', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await user.type(input, 'teste');

    const clearButton = screen.getByRole('button', { name: /limpar/i });
    await user.click(clearButton);

    expect(input).toHaveValue('');
  });
});

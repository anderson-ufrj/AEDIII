import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentNavigation } from '@/components/content-navigation';

describe('ContentNavigation', () => {
  const mockPrevious = {
    slug: 'test-prev',
    title: 'Conteúdo Anterior'
  };

  const mockNext = {
    slug: 'test-next',
    title: 'Próximo Conteúdo'
  };

  it('deve renderizar navegação anterior quando fornecida', () => {
    render(<ContentNavigation previous={mockPrevious} next={null} />);
    expect(screen.getByText('Conteúdo Anterior')).toBeInTheDocument();
  });

  it('deve renderizar navegação próxima quando fornecida', () => {
    render(<ContentNavigation previous={null} next={mockNext} />);
    expect(screen.getByText('Próximo Conteúdo')).toBeInTheDocument();
  });

  it('deve renderizar ambas as navegações quando fornecidas', () => {
    render(<ContentNavigation previous={mockPrevious} next={mockNext} />);
    expect(screen.getByText('Conteúdo Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próximo Conteúdo')).toBeInTheDocument();
  });

  it('deve ter links corretos para navegação', () => {
    render(<ContentNavigation previous={mockPrevious} next={mockNext} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/content/test-prev');
    expect(links[1]).toHaveAttribute('href', '/content/test-next');
  });

  it('não deve renderizar nada quando ambos são nulos', () => {
    const { container } = render(<ContentNavigation previous={null} next={null} />);
    expect(container.firstChild).toBeNull();
  });
});

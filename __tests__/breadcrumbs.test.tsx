import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '@/components/breadcrumbs';

describe('Breadcrumbs', () => {
  it('should render home link', () => {
    render(<Breadcrumbs items={[]} />);
    const homeLink = screen.getByRole('link', { name: /início/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render breadcrumb items', () => {
    const items = [
      { label: 'Conteúdo', href: '/content' },
      { label: 'Árvores AVL' },
    ];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    expect(screen.getByText('Árvores AVL')).toBeInTheDocument();
  });

  it('should render links for non-last items with href', () => {
    const items = [
      { label: 'Conteúdo', href: '/content' },
      { label: 'Árvores AVL' },
    ];

    render(<Breadcrumbs items={items} />);

    const contentLink = screen.getByRole('link', { name: 'Conteúdo' });
    expect(contentLink).toHaveAttribute('href', '/content');
  });

  it('should not render link for last item', () => {
    const items = [
      { label: 'Conteúdo', href: '/content' },
      { label: 'Árvores AVL' },
    ];

    render(<Breadcrumbs items={items} />);

    // Last item should not be a link
    const lastItem = screen.getByText('Árvores AVL');
    expect(lastItem.tagName).not.toBe('A');
  });

  it('should have proper aria-label', () => {
    render(<Breadcrumbs items={[]} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});

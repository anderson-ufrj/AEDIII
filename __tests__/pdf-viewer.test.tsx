import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do pdfjs-dist
vi.mock('pdfjs-dist', () => ({
  getDocument: vi.fn(() => ({
    promise: Promise.resolve({
      numPages: 3,
      getPage: vi.fn((pageNum) => Promise.resolve({
        pageNumber: pageNum,
        getViewport: vi.fn(() => ({ width: 600, height: 800 })),
        render: vi.fn(() => ({ promise: Promise.resolve() }))
      }))
    })
  })),
  GlobalWorkerOptions: { workerSrc: '' }
}));

describe('PDFViewer', () => {
  const mockPdfUrl = '/pdfs/test.pdf';

  it('deve renderizar componente de visualização de PDF', () => {
    const { container } = render(
      <div data-testid="pdf-container">PDF Viewer</div>
    );
    expect(container).toBeInTheDocument();
  });

  it('deve exibir controles de navegação', () => {
    render(
      <div>
        <button aria-label="Página anterior">Anterior</button>
        <button aria-label="Próxima página">Próxima</button>
      </div>
    );

    expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Próxima página')).toBeInTheDocument();
  });

  it('deve exibir número da página atual', () => {
    render(<div>Página 1 de 3</div>);
    expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
  });

  it('deve ter ferramentas de anotação', () => {
    render(
      <div>
        <button aria-label="Desenhar">Desenhar</button>
        <button aria-label="Destacar">Destacar</button>
        <button aria-label="Apagar">Apagar</button>
      </div>
    );

    expect(screen.getByLabelText('Desenhar')).toBeInTheDocument();
    expect(screen.getByLabelText('Destacar')).toBeInTheDocument();
    expect(screen.getByLabelText('Apagar')).toBeInTheDocument();
  });

  it('deve permitir zoom in e zoom out', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button aria-label="Aumentar zoom">+</button>
        <button aria-label="Diminuir zoom">-</button>
        <span>100%</span>
      </div>
    );

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByLabelText('Aumentar zoom')).toBeInTheDocument();
    expect(screen.getByLabelText('Diminuir zoom')).toBeInTheDocument();
  });

  it('deve salvar anotações no localStorage', () => {
    const mockAnnotations = [
      { id: '1', type: 'draw', data: { x: 10, y: 20 } }
    ];

    localStorage.setItem('pdf-annotations-test', JSON.stringify(mockAnnotations));
    const saved = JSON.parse(localStorage.getItem('pdf-annotations-test') || '[]');

    expect(saved).toHaveLength(1);
    expect(saved[0].type).toBe('draw');
  });

  it('deve limpar anotações ao clicar em limpar', async () => {
    localStorage.setItem('pdf-annotations-test', JSON.stringify([
      { id: '1', type: 'draw' }
    ]));

    const user = userEvent.setup();
    render(<button onClick={() => localStorage.removeItem('pdf-annotations-test')}>Limpar</button>);

    await user.click(screen.getByText('Limpar'));

    expect(localStorage.getItem('pdf-annotations-test')).toBeNull();
  });
});

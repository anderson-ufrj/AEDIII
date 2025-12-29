import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BTreeVisualizer } from "@/components/btree-visualizer";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    g: ({ children, ...props }: React.PropsWithChildren<object>) => <g {...props}>{children}</g>,
    line: (props: object) => <line {...props} />,
  },
}));

describe("BTreeVisualizer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default title", () => {
    render(<BTreeVisualizer />);
    expect(screen.getByText(/Visualizador de Árvore B/i)).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<BTreeVisualizer title="Custom B-Tree" />);
    expect(screen.getByText("Custom B-Tree")).toBeInTheDocument();
  });

  it("renders with custom order", () => {
    render(<BTreeVisualizer order={5} />);
    expect(screen.getByText(/Visualizador de Árvore B \(Ordem 5\)/i)).toBeInTheDocument();
  });

  it("shows empty tree message initially", () => {
    render(<BTreeVisualizer />);
    expect(screen.getByText(/Árvore vazia/i)).toBeInTheDocument();
  });

  it("renders all control buttons", () => {
    render(<BTreeVisualizer />);
    expect(screen.getByRole("button", { name: /Inserir/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Aleatório/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Exportar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Importar/i })).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<BTreeVisualizer />);
    expect(screen.getByPlaceholderText(/Digite um número/i)).toBeInTheDocument();
  });

  it("inserts a value when clicking insert button", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<BTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "42");

    const insertButton = screen.getByRole("button", { name: /Inserir/i });
    await user.click(insertButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Valor 42 inserido");
    });
  });

  it("inserts a value when pressing Enter", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<BTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "25{Enter}");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Valor 25 inserido");
    });
  });

  it("shows error for invalid input", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<BTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "abc");

    const insertButton = screen.getByRole("button", { name: /Inserir/i });
    await user.click(insertButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Por favor, insira um número válido");
    });
  });

  it("generates random tree when clicking random button", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<BTreeVisualizer />);

    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Árvore aleatória gerada");
    });
  });

  it("clears tree when clicking clear button", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<BTreeVisualizer />);

    // First insert a value
    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "10{Enter}");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });

    // Then clear
    const clearButton = screen.getByRole("button", { name: /Limpar/i });
    await user.click(clearButton);

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("Árvore limpa");
    });

    expect(screen.getByText(/Árvore vazia/i)).toBeInTheDocument();
  });

  it("disables export button when tree is empty", () => {
    render(<BTreeVisualizer />);
    const exportButton = screen.getByRole("button", { name: /Exportar/i });
    expect(exportButton).toBeDisabled();
  });

  it("shows stats badges after inserting values", async () => {
    const user = userEvent.setup();

    render(<BTreeVisualizer order={3} />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "50{Enter}");

    await waitFor(() => {
      expect(screen.getByText(/Ordem: 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Min Grau/i)).toBeInTheDocument();
    });
  });

  it("displays history after operations", async () => {
    const user = userEvent.setup();

    render(<BTreeVisualizer />);

    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    await waitFor(() => {
      expect(screen.getByText(/Histórico:/i)).toBeInTheDocument();
      expect(screen.getByText(/Gerou árvore com:/i)).toBeInTheDocument();
    });
  });

  it("shows error when exporting empty tree", async () => {
    render(<BTreeVisualizer />);

    // Export button should be disabled when tree is empty
    const exportButton = screen.getByRole("button", { name: /Exportar/i });
    expect(exportButton).toBeDisabled();
  });
});

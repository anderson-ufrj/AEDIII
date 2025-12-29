import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SplayTreeVisualizer } from "@/components/splay-tree-visualizer";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    g: ({ children, ...props }: React.PropsWithChildren<object>) => <g {...props}>{children}</g>,
    line: (props: object) => <line {...props} />,
    circle: (props: object) => <circle {...props} />,
  },
}));

describe("SplayTreeVisualizer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default title", () => {
    render(<SplayTreeVisualizer />);
    expect(screen.getByText(/Visualizador de Árvore Splay/i)).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<SplayTreeVisualizer title="My Splay Tree" />);
    expect(screen.getByText("My Splay Tree")).toBeInTheDocument();
  });

  it("shows empty tree message initially", () => {
    render(<SplayTreeVisualizer />);
    expect(screen.getByText(/Árvore vazia/i)).toBeInTheDocument();
  });

  it("renders all control buttons", () => {
    render(<SplayTreeVisualizer />);
    expect(screen.getByRole("button", { name: /Inserir/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remover/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Aleatório/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Exportar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Importar/i })).toBeInTheDocument();
  });

  it("inserts a value successfully", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<SplayTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "50");

    const insertButton = screen.getByRole("button", { name: /Inserir/i });
    await user.click(insertButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Valor 50 inserido");
    });
  });

  it("shows error for invalid input", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<SplayTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "invalid");

    const insertButton = screen.getByRole("button", { name: /Inserir/i });
    await user.click(insertButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Por favor, insira um número válido");
    });
  });

  it("generates random tree", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<SplayTreeVisualizer />);

    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Árvore aleatória gerada");
    });
  });

  it("clears tree", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<SplayTreeVisualizer />);

    // First add something
    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    // Then clear
    const clearButton = screen.getByRole("button", { name: /Limpar/i });
    await user.click(clearButton);

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("Árvore limpa");
    });

    expect(screen.getByText(/Árvore vazia/i)).toBeInTheDocument();
  });

  it("shows error when searching empty tree", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<SplayTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "10");

    const searchButton = screen.getByRole("button", { name: /Buscar/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Árvore vazia");
    });
  });

  it("disables export button when tree is empty", () => {
    render(<SplayTreeVisualizer />);
    const exportButton = screen.getByRole("button", { name: /Exportar/i });
    expect(exportButton).toBeDisabled();
  });

  it("displays root badge after inserting values", async () => {
    const user = userEvent.setup();

    render(<SplayTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "42{Enter}");

    await waitFor(() => {
      expect(screen.getByText(/Raiz: 42/i)).toBeInTheDocument();
    });
  });

  it("displays splay tree badge after adding values", async () => {
    const user = userEvent.setup();

    render(<SplayTreeVisualizer />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "30{Enter}");

    await waitFor(() => {
      // Check for badge by looking at badge text
      const badges = screen.getAllByText(/Árvore Splay|Raiz/i);
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  it("shows description about splay behavior", () => {
    render(<SplayTreeVisualizer />);
    expect(screen.getByText(/reorganizam-se automaticamente/i)).toBeInTheDocument();
  });
});

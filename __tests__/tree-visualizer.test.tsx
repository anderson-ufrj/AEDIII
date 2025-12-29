import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TreeVisualizer } from "@/components/tree-visualizer";

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

describe("TreeVisualizer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default title", () => {
    render(<TreeVisualizer type="avl" />);
    expect(screen.getByText(/Visualizador de Árvore AVL/i)).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<TreeVisualizer type="avl" title="My Custom Tree" />);
    expect(screen.getByText("My Custom Tree")).toBeInTheDocument();
  });

  it("renders AVL tree type", () => {
    render(<TreeVisualizer type="avl" />);
    expect(screen.getByText(/Árvore AVL/i)).toBeInTheDocument();
  });

  it("renders Red-Black tree type", () => {
    render(<TreeVisualizer type="rbt" />);
    expect(screen.getByText(/Rubro-Negra/i)).toBeInTheDocument();
  });

  it("shows empty tree message initially", () => {
    render(<TreeVisualizer type="avl" />);
    expect(screen.getByText(/Árvore vazia/i)).toBeInTheDocument();
  });

  it("renders all control buttons", () => {
    render(<TreeVisualizer type="avl" />);
    expect(screen.getByRole("button", { name: /Inserir/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remover/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Aleatório/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<TreeVisualizer type="avl" />);
    expect(screen.getByPlaceholderText(/Digite um número/i)).toBeInTheDocument();
  });

  it("inserts a value successfully", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<TreeVisualizer type="avl" />);

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

    render(<TreeVisualizer type="avl" />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "abc");

    const insertButton = screen.getByRole("button", { name: /Inserir/i });
    await user.click(insertButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Por favor, insira um número válido");
    });
  });

  it("generates random tree", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<TreeVisualizer type="avl" />);

    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Árvore aleatória gerada");
    });
  });

  it("clears tree", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<TreeVisualizer type="avl" />);

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

  it("inserts value with Enter key", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<TreeVisualizer type="avl" />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "25{Enter}");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Valor 25 inserido");
    });
  });

  it("disables export button when tree is empty", () => {
    render(<TreeVisualizer type="avl" />);
    const exportButton = screen.getByRole("button", { name: /Exportar/i });
    expect(exportButton).toBeDisabled();
  });

  it("displays history after operations", async () => {
    const user = userEvent.setup();

    render(<TreeVisualizer type="avl" />);

    const randomButton = screen.getByRole("button", { name: /Aleatório/i });
    await user.click(randomButton);

    await waitFor(() => {
      expect(screen.getByText(/Histórico:/i)).toBeInTheDocument();
      expect(screen.getByText(/Gerou árvore com:/i)).toBeInTheDocument();
    });
  });

  it("shows tree stats after inserting values", async () => {
    const user = userEvent.setup();

    render(<TreeVisualizer type="avl" />);

    const input = screen.getByPlaceholderText(/Digite um número/i);
    await user.type(input, "42{Enter}");

    await waitFor(() => {
      expect(screen.getByText(/Altura:/i)).toBeInTheDocument();
    });
  });
});

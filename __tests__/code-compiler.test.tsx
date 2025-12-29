import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CodeCompiler } from "@/components/code-compiler";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CodeCompiler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with C++ title by default", () => {
    render(<CodeCompiler />);
    expect(screen.getByText(/Compilador C\+\+ Online/i)).toBeInTheDocument();
  });

  it("renders with C title when language is c", () => {
    render(<CodeCompiler language="c" />);
    expect(screen.getByText(/Compilador C Online/i)).toBeInTheDocument();
  });

  it("renders code textarea", () => {
    render(<CodeCompiler />);
    expect(screen.getByPlaceholderText(/Digite seu código aqui/i)).toBeInTheDocument();
  });

  it("renders execute button", () => {
    render(<CodeCompiler />);
    expect(screen.getByRole("button", { name: /Executar/i })).toBeInTheDocument();
  });

  it("renders clear button", () => {
    render(<CodeCompiler />);
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    const onClose = vi.fn();
    render(<CodeCompiler onClose={onClose} />);

    const closeButtons = screen.getAllByRole("button");
    const closeButton = closeButtons.find((btn) =>
      btn.querySelector("svg.lucide-x") || btn.innerHTML.includes("X")
    );
    expect(closeButton).toBeTruthy();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClose = vi.fn();
    render(<CodeCompiler onClose={onClose} />);

    // Find the close button (it's the one with X icon in header)
    const closeButtons = screen.getAllByRole("button");
    const closeButton = closeButtons[0]; // First button should be close
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("renders input and output tabs", () => {
    render(<CodeCompiler />);
    expect(screen.getByRole("tab", { name: /Entrada/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Saída/i })).toBeInTheDocument();
  });

  it("displays initial code if provided", () => {
    const initialCode = "int main() { return 0; }";
    render(<CodeCompiler initialCode={initialCode} />);

    const textarea = screen.getByPlaceholderText(/Digite seu código aqui/i);
    expect(textarea).toHaveValue(initialCode);
  });

  it("clears code when clear button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<CodeCompiler initialCode="some code" />);

    const clearButton = screen.getByRole("button", { name: /Limpar/i });
    await user.click(clearButton);

    const textarea = screen.getByPlaceholderText(/Digite seu código aqui/i);
    expect(textarea).toHaveValue("");
  });

  it("renders examples dropdown", () => {
    render(<CodeCompiler />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/Exemplos/i)).toBeInTheDocument();
  });

  it("shows compiling state when executing", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<CodeCompiler initialCode="#include <iostream>" />);

    const executeButton = screen.getByRole("button", { name: /Executar/i });
    await user.click(executeButton);

    expect(screen.getByText(/Compilando/i)).toBeInTheDocument();
  });

  it("displays output on successful compilation", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ stdout: "Hello, World!" }),
    });

    render(<CodeCompiler initialCode="#include <iostream>" />);

    const executeButton = screen.getByRole("button", { name: /Executar/i });
    await user.click(executeButton);

    // Switch to output tab
    const outputTab = screen.getByRole("tab", { name: /Saída/i });
    await user.click(outputTab);

    await waitFor(() => {
      expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
  });

  it("displays error on compilation error", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ stderr: "Compilation error: undefined reference" }),
    });

    render(<CodeCompiler initialCode="invalid code" />);

    const executeButton = screen.getByRole("button", { name: /Executar/i });
    await user.click(executeButton);

    // Switch to output tab
    const outputTab = screen.getByRole("tab", { name: /Saída/i });
    await user.click(outputTab);

    await waitFor(() => {
      expect(screen.getByText(/Compilation error/i)).toBeInTheDocument();
    });
  });

  it("displays footer with tips", () => {
    render(<CodeCompiler />);
    expect(screen.getByText(/Dica/i)).toBeInTheDocument();
    expect(screen.getByText(/Powered by Judge0/i)).toBeInTheDocument();
  });

  it("allows typing in stdin input", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<CodeCompiler />);

    const inputTab = screen.getByRole("tab", { name: /Entrada/i });
    await user.click(inputTab);

    const stdinTextarea = screen.getByPlaceholderText(/Dados de entrada/i);
    await user.type(stdinTextarea, "test input");

    expect(stdinTextarea).toHaveValue("test input");
  });
});

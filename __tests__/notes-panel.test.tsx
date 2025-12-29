import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotesPanel } from "@/components/notes-panel";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock localStorage utilities
vi.mock("@/lib/utils/local-storage", () => ({
  safeLocalStorageGet: vi.fn().mockReturnValue([]),
  safeLocalStorageSet: vi.fn().mockReturnValue(true),
}));

describe("NotesPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders panel title", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText(/Minhas Notas/i)).toBeInTheDocument();
    });
  });

  it("renders note count", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText("(0)")).toBeInTheDocument();
    });
  });

  it("renders textarea for new note", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Adicione uma nova nota/i)).toBeInTheDocument();
    });
  });

  it("renders add note button", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Adicionar Nota/i })).toBeInTheDocument();
    });
  });

  it("shows empty state message when no notes", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhuma nota ainda/i)).toBeInTheDocument();
    });
  });

  it("add note button is disabled when textarea is empty", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      const addButton = screen.getByRole("button", { name: /Adicionar Nota/i });
      expect(addButton).toBeDisabled();
    });
  });

  it("enables add button when text is entered", async () => {
    const user = userEvent.setup();
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Adicione uma nova nota/i)).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText(/Adicione uma nova nota/i);
    await user.type(textarea, "My test note");

    const addButton = screen.getByRole("button", { name: /Adicionar Nota/i });
    expect(addButton).not.toBeDisabled();
  });

  it("adds a note when clicking add button", async () => {
    const user = userEvent.setup();
    const { toast } = await import("sonner");

    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Adicione uma nova nota/i)).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText(/Adicione uma nova nota/i);
    await user.type(textarea, "My test note");

    const addButton = screen.getByRole("button", { name: /Adicionar Nota/i });
    await user.click(addButton);

    expect(toast.success).toHaveBeenCalledWith("Nota adicionada!");
  });

  it("shows keyboard shortcut hint", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText(/Ctrl \+ Enter/i)).toBeInTheDocument();
    });
  });

  it("renders export button", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByTitle(/Exportar notas/i)).toBeInTheDocument();
    });
  });

  it("renders import button", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByTitle(/Importar notas/i)).toBeInTheDocument();
    });
  });

  it("export button is disabled when no notes", async () => {
    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      const exportButton = screen.getByTitle(/Exportar notas/i);
      expect(exportButton).toBeDisabled();
    });
  });

  it("renders with notes from localStorage", async () => {
    const { safeLocalStorageGet } = await import("@/lib/utils/local-storage");
    vi.mocked(safeLocalStorageGet).mockReturnValue([
      {
        id: "1",
        content: "Test note content",
        timestamp: Date.now(),
        contentSlug: "test-content",
      },
    ]);

    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText("Test note content")).toBeInTheDocument();
    });
  });

  it("displays note count correctly with existing notes", async () => {
    const { safeLocalStorageGet } = await import("@/lib/utils/local-storage");
    vi.mocked(safeLocalStorageGet).mockReturnValue([
      { id: "1", content: "Note 1", timestamp: Date.now(), contentSlug: "test" },
      { id: "2", content: "Note 2", timestamp: Date.now(), contentSlug: "test" },
    ]);

    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText("(2)")).toBeInTheDocument();
    });
  });

  it("shows 'Notas anteriores' when there are existing notes", async () => {
    const { safeLocalStorageGet } = await import("@/lib/utils/local-storage");
    vi.mocked(safeLocalStorageGet).mockReturnValue([
      { id: "1", content: "Note 1", timestamp: Date.now(), contentSlug: "test" },
    ]);

    render(<NotesPanel contentSlug="test-content" contentTitle="Test Content" />);

    await waitFor(() => {
      expect(screen.getByText(/Notas anteriores/i)).toBeInTheDocument();
    });
  });
});

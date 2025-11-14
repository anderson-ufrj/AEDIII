"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  StickyNote,
  Plus,
  Trash2,
  Download,
  Upload,
  Edit2,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  content: string;
  timestamp: number;
  contentSlug: string;
}

interface NotesPanelProps {
  contentSlug: string;
  contentTitle: string;
}

export function NotesPanel({ contentSlug, contentTitle }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    setMounted(true);
    loadNotes();
  }, [contentSlug]);

  const loadNotes = () => {
    try {
      const stored = localStorage.getItem(`notes_${contentSlug}`);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
    }
  };

  const saveNotes = (updatedNotes: Note[]) => {
    try {
      localStorage.setItem(`notes_${contentSlug}`, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      toast.error("Erro ao salvar nota");
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      timestamp: Date.now(),
      contentSlug,
    };

    const updatedNotes = [...notes, note];
    saveNotes(updatedNotes);
    setNewNote("");
    toast.success("Nota adicionada!");
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    toast.success("Nota excluída");
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editContent.trim() || !editingId) return;

    const updatedNotes = notes.map((note) =>
      note.id === editingId
        ? { ...note, content: editContent.trim(), timestamp: Date.now() }
        : note
    );
    saveNotes(updatedNotes);
    setEditingId(null);
    setEditContent("");
    toast.success("Nota atualizada!");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const exportNotes = () => {
    const exportData = {
      contentSlug,
      contentTitle,
      notes,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notas_${contentSlug}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Notas exportadas!");
  };

  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.notes && Array.isArray(data.notes)) {
          saveNotes(data.notes);
          toast.success(`${data.notes.length} nota(s) importada(s)!`);
        }
      } catch (error) {
        toast.error("Erro ao importar notas");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!mounted) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Minhas Notas</h3>
          <span className="text-xs text-muted-foreground">
            ({notes.length})
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportNotes}
            disabled={notes.length === 0}
            title="Exportar notas"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => document.getElementById("import-notes")?.click()}
            title="Importar notas"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <input
            id="import-notes"
            type="file"
            accept=".json"
            onChange={importNotes}
            className="hidden"
          />
        </div>
      </div>

      {/* New Note Form */}
      <div className="space-y-2 mb-4">
        <Textarea
          placeholder="Adicione uma nova nota sobre este conteúdo..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              addNote();
            }
          }}
          className="min-h-[80px] resize-none"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Ctrl + Enter para salvar
          </span>
          <Button onClick={addNote} disabled={!newNote.trim()} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Nota
          </Button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">
              Notas anteriores
            </h4>
            {notes.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Ver menos" : `Ver todas (${notes.length})`}
              </Button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(isExpanded ? notes : notes.slice(-3)).map((note) => (
              <Card key={note.id} className="p-3 bg-muted/50">
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[60px] resize-none"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} size="sm" variant="default">
                        <Check className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                      <Button onClick={cancelEdit} size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm whitespace-pre-wrap mb-2">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(note.timestamp)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(note)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {notes.length === 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          Nenhuma nota ainda. Adicione sua primeira anotação!
        </div>
      )}
    </Card>
  );
}

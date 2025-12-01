"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Loader2, Code2, Terminal, X, Trash2 } from "lucide-react";

// Custom debounce hook for localStorage saves
function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

interface CodeCompilerProps {
  initialCode?: string;
  language?: "cpp" | "c";
  onClose?: () => void;
}

// Code examples
const EXAMPLES = {
  c: {
    "Hello World": `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    "Soma de Números": `#include <stdio.h>

int main() {
    int a, b;
    printf("Digite dois números: ");
    scanf("%d %d", &a, &b);
    printf("Soma: %d\\n", a + b);
    return 0;
}`,
    "Fatorial": `#include <stdio.h>

int fatorial(int n) {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}

int main() {
    int num;
    printf("Digite um número: ");
    scanf("%d", &num);
    printf("Fatorial de %d = %d\\n", num, fatorial(num));
    return 0;
}`,
  },
  cpp: {
    "Hello World": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    "Soma de Números": `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Digite dois números: ";
    cin >> a >> b;
    cout << "Soma: " << (a + b) << endl;
    return 0;
}`,
    "Vetor e Ordenação": `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    sort(arr, arr + n);

    cout << "Array ordenado: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;

    return 0;
}`,
  }
};

export function CodeCompiler({
  initialCode = "",
  language = "cpp",
  onClose
}: CodeCompilerProps) {
  const STORAGE_KEY = `compiler_${language}_code`;

  const [code, setCode] = useState(() => {
    // Try to load from localStorage on mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || initialCode;
    }
    return initialCode;
  });
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState("");

  // Debounced save function to avoid excessive localStorage writes
  const saveToStorage = useCallback((codeToSave: string) => {
    if (codeToSave && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, codeToSave);
    }
  }, [STORAGE_KEY]);

  const debouncedSave = useDebouncedCallback(saveToStorage, 1000);

  // Auto-save to localStorage when code changes (debounced)
  useEffect(() => {
    debouncedSave(code);
  }, [code, debouncedSave]);

  const compileCode = useCallback(async () => {
    setIsCompiling(true);
    setError("");
    setOutput("");

    try {
      // Usando instância pública gratuita do Judge0 CE
      // Referência: https://ce.judge0.com
      const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language === "cpp" ? 54 : 50, // 54 = C++ (GCC 9.2.0), 50 = C (GCC 9.2.0)
          stdin: input,
          cpu_time_limit: 2,
          memory_limit: 128000,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText || 'Falha ao compilar código'}`);
      }

      const result = await response.json();

      // Com wait=true, a resposta já vem processada
      if (result.stdout) {
        setOutput(result.stdout);
      } else if (result.stderr) {
        setError(result.stderr);
      } else if (result.compile_output) {
        setError(result.compile_output);
      } else if (result.message) {
        setError(result.message);
      } else if (result.status?.description) {
        setError(`Status: ${result.status.description}`);
      } else {
        setError("Nenhuma saída produzida");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao compilar código");
    } finally {
      setIsCompiling(false);
    }
  }, [code, input, language]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] flex flex-col bg-white dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Compilador {language === "cpp" ? "C++" : "C"} Online
            </h2>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Código</label>
              <div className="flex gap-2 flex-wrap">
                {/* Examples dropdown */}
                <select
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                  onChange={(e) => {
                    if (e.target.value) {
                      setCode(EXAMPLES[language][e.target.value as keyof typeof EXAMPLES[typeof language]]);
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>📚 Exemplos</option>
                  {Object.keys(EXAMPLES[language]).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCode("")}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpar
                </Button>

                <Button
                  onClick={compileCode}
                  disabled={isCompiling}
                  size="sm"
                  className="gap-2"
                >
                  {isCompiling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Compilando...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Executar
                    </>
                  )}
                </Button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 font-mono text-sm p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Digite seu código aqui..."
              spellCheck={false}
            />
          </div>

          {/* Input/Output */}
          <div className="flex-1 flex flex-col gap-2">
            <Tabs defaultValue="input" className="flex-1 flex flex-col">
              <TabsList>
                <TabsTrigger value="input">Entrada</TabsTrigger>
                <TabsTrigger value="output">Saída</TabsTrigger>
              </TabsList>

              <TabsContent value="input" className="flex-1 flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium">Entrada do Programa (stdin)</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 font-mono text-sm p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Dados de entrada para cin/scanf..."
                  spellCheck={false}
                />
              </TabsContent>

              <TabsContent value="output" className="flex-1 flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Saída do Programa
                </label>
                <div className="flex-1 font-mono text-sm p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 overflow-auto">
                  {error ? (
                    <div className="text-red-500 whitespace-pre-wrap">{error}</div>
                  ) : output ? (
                    <div className="text-green-600 dark:text-green-400 whitespace-pre-wrap">{output}</div>
                  ) : (
                    <div className="text-muted-foreground">
                      Execute o código para ver a saída...
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center text-sm text-muted-foreground">
          <div>
            💡 Dica: Use cin/scanf para entrada e cout/printf para saída
          </div>
          <div>
            Powered by Judge0 CE
          </div>
        </div>
      </Card>
    </div>
  );
}

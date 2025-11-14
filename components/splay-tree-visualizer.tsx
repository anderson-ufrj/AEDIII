"use client";

import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, RotateCcw, Play, Download, Upload, Search } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
  accessed?: boolean; // To highlight recently accessed nodes
}

interface SplayTreeVisualizerProps {
  title?: string;
}

export function SplayTreeVisualizer({ title }: SplayTreeVisualizerProps) {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const [accessedNode, setAccessedNode] = useState<number | null>(null);

  // Rotation functions
  const rotateRight = (y: TreeNode): TreeNode => {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    return x;
  };

  const rotateLeft = (x: TreeNode): TreeNode => {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    return y;
  };

  // Splay operation - moves node with value to root
  const splay = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root || root.value === value) {
      return root;
    }

    // Value is in left subtree
    if (value < root.value) {
      if (!root.left) return root;

      // Zig-Zig (Left-Left)
      if (value < root.left.value) {
        root.left.left = splay(root.left.left, value);
        root = rotateRight(root);
      }
      // Zig-Zag (Left-Right)
      else if (value > root.left.value) {
        root.left.right = splay(root.left.right, value);
        if (root.left.right) {
          root.left = rotateLeft(root.left);
        }
      }

      return root.left ? rotateRight(root) : root;
    }
    // Value is in right subtree
    else {
      if (!root.right) return root;

      // Zig-Zag (Right-Left)
      if (value < root.right.value) {
        root.right.left = splay(root.right.left, value);
        if (root.right.left) {
          root.right = rotateRight(root.right);
        }
      }
      // Zig-Zig (Right-Right)
      else if (value > root.right.value) {
        root.right.right = splay(root.right.right, value);
        root = rotateLeft(root);
      }

      return root.right ? rotateLeft(root) : root;
    }
  };

  // Insert node
  const insert = useCallback((root: TreeNode | null, value: number): TreeNode => {
    if (!root) {
      return { value, left: null, right: null };
    }

    root = splay(root, value);

    // If splay returned null (shouldn't happen), create new node
    if (!root) {
      return { value, left: null, right: null };
    }

    // Duplicate value
    if (root.value === value) {
      return root;
    }

    const newNode: TreeNode = { value, left: null, right: null };

    if (value < root.value) {
      newNode.right = root;
      newNode.left = root.left;
      root.left = null;
    } else {
      newNode.left = root;
      newNode.right = root.right;
      root.right = null;
    }

    return newNode;
  }, []);

  // Delete node
  const deleteNode = useCallback((root: TreeNode | null, value: number): TreeNode | null => {
    if (!root) return null;

    root = splay(root, value);

    if (!root || root.value !== value) {
      return root; // Value not found
    }

    if (!root.left) {
      return root.right;
    }

    const temp = root.left;
    const newRoot = splay(temp, value);
    if (newRoot) {
      newRoot.right = root.right;
    }

    return newRoot;
  }, []);

  // Search (access) node - splays it to root
  const searchNode = (value: number) => {
    if (!root) {
      toast.error("Árvore vazia");
      return;
    }

    setAnimating(true);
    setAccessedNode(value);
    setTimeout(() => {
      setRoot((prev) => splay(prev, value));
      setHistory((prev) => [...prev, `Acessou ${value} (movido para raiz)`]);
      setAnimating(false);
      toast.success(`Valor ${value} acessado e movido para raiz`);
      setTimeout(() => setAccessedNode(null), 2000);
    }, 300);
  };

  // Calculate positions for drawing
  const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number): void => {
    if (!node) return;

    node.x = x;
    node.y = y;
    node.accessed = node.value === accessedNode;

    if (node.left) {
      calculatePositions(node.left, x - offset, y + 80, offset / 2);
    }
    if (node.right) {
      calculatePositions(node.right, x + offset, y + 80, offset / 2);
    }
  };

  // Handle insert
  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Por favor, insira um número válido");
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setRoot((prev) => insert(prev, value));
      setHistory((prev) => [...prev, `Inseriu ${value}`]);
      setInputValue("");
      setAnimating(false);
      toast.success(`Valor ${value} inserido`);
    }, 300);
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Por favor, insira um número válido");
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setRoot((prev) => deleteNode(prev, value));
      setHistory((prev) => [...prev, `Removeu ${value}`]);
      setInputValue("");
      setAnimating(false);
      toast.success(`Valor ${value} removido`);
    }, 300);
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Por favor, insira um número válido");
      return;
    }
    searchNode(value);
    setInputValue("");
  };

  const handleClear = () => {
    setRoot(null);
    setHistory([]);
    setAccessedNode(null);
    toast.info("Árvore limpa");
  };

  const handleRandom = () => {
    const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    let newRoot: TreeNode | null = null;
    values.forEach((v) => {
      newRoot = insert(newRoot, v);
    });
    setRoot(newRoot);
    setHistory([`Gerou árvore com: ${values.join(", ")}`]);
    toast.success("Árvore aleatória gerada");
  };

  // Export/Import handlers
  const handleExport = () => {
    if (!root) {
      toast.error("Nenhuma árvore para exportar");
      return;
    }
    const data = {
      type: "splay",
      root,
      timestamp: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tree-splay-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Árvore exportada com sucesso");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.type !== "splay") {
            toast.error(`Arquivo é para ${data.type}, mas visualizador é splay`);
            return;
          }
          setRoot(data.root);
          setHistory([`Árvore importada de ${file.name}`]);
          toast.success("Árvore importada com sucesso");
        } catch (error) {
          toast.error("Erro ao importar arquivo");
          console.error(error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Update positions when root changes
  useEffect(() => {
    if (root) {
      calculatePositions(root, 400, 50, 150);
    }
  }, [root, accessedNode]);

  // Render tree
  const renderTree = (node: TreeNode | null): React.JSX.Element[] => {
    if (!node || !node.x || !node.y) return [];

    const elements: React.JSX.Element[] = [];

    // Draw lines to children
    if (node.left && node.left.x && node.left.y) {
      elements.push(
        <motion.line
          key={`line-left-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      );
      elements.push(...renderTree(node.left));
    }

    if (node.right && node.right.x && node.right.y) {
      elements.push(
        <motion.line
          key={`line-right-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      );
      elements.push(...renderTree(node.right));
    }

    // Draw node
    const isAccessed = node.accessed;
    const nodeColor = isAccessed ? "text-yellow-500" : "text-primary";

    elements.push(
      <motion.g
        key={`node-${node.value}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isAccessed ? 1.2 : 1,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill="currentColor"
          className={nodeColor}
          animate={{
            r: isAccessed ? 28 : 25,
          }}
          transition={{ duration: 0.3 }}
        />
        {isAccessed && (
          <circle
            cx={node.x}
            cy={node.y}
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-yellow-400"
            opacity="0.6"
          />
        )}
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary-foreground font-bold text-sm"
        >
          {node.value}
        </text>
      </motion.g>
    );

    return elements;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">
          {title || "Visualizador de Árvore Splay"}
        </h3>
        <p className="text-sm text-muted-foreground">
          Árvores Splay reorganizam-se automaticamente, movendo nós acessados para a raiz. Use &quot;Buscar&quot; para ver o efeito splay.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          type="number"
          placeholder="Digite um número"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          className="w-40"
          disabled={animating}
        />
        <Button onClick={handleInsert} disabled={animating} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Inserir
        </Button>
        <Button onClick={handleSearch} disabled={animating} variant="secondary" size="sm">
          <Search className="h-4 w-4 mr-1" />
          Buscar
        </Button>
        <Button onClick={handleDelete} disabled={animating} variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-1" />
          Remover
        </Button>
        <Button onClick={handleRandom} disabled={animating} variant="secondary" size="sm">
          <Play className="h-4 w-4 mr-1" />
          Aleatório
        </Button>
        <Button onClick={handleClear} disabled={animating} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      </div>

      {/* Advanced Controls */}
      <div className="flex flex-wrap gap-2 mb-4 border-t pt-4">
        <Button onClick={handleExport} disabled={!root} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
        <Button onClick={handleImport} variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1" />
          Importar
        </Button>
      </div>

      {/* Stats */}
      {root && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Raiz: {root.value}</Badge>
          <Badge variant="default">Árvore Splay</Badge>
        </div>
      )}

      {/* Visualization */}
      <div className="border rounded-lg bg-background overflow-auto">
        <svg width="800" height="500" className="mx-auto">
          {root && renderTree(root)}
          {!root && (
            <text x="400" y="250" textAnchor="middle" className="fill-muted-foreground text-sm">
              Árvore vazia. Insira valores para começar.
            </text>
          )}
        </svg>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Histórico:</h4>
          <div className="max-h-32 overflow-y-auto text-xs text-muted-foreground space-y-1">
            {history.slice(-10).map((item, i) => (
              <div key={i}>• {item}</div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

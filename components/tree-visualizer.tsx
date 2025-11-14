"use client";

import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, RotateCcw, Play } from "lucide-react";
import { toast } from "sonner";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  x?: number;
  y?: number;
}

interface TreeVisualizerProps {
  type?: "avl" | "rbt";
  title?: string;
}

export function TreeVisualizer({ type = "avl", title }: TreeVisualizerProps) {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  // AVL Helper functions
  const getHeight = (node: TreeNode | null): number => {
    return node ? node.height : 0;
  };

  const getBalance = (node: TreeNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  };

  const updateHeight = (node: TreeNode): void => {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  };

  // Rotations
  const rotateRight = (y: TreeNode): TreeNode => {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
  };

  const rotateLeft = (x: TreeNode): TreeNode => {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
  };

  // Insert node
  const insert = useCallback((node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, left: null, right: null, height: 1 };
    }

    if (value < node.value) {
      node.left = insert(node.left, value);
    } else if (value > node.value) {
      node.right = insert(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    updateHeight(node);

    const balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
      return rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
      return rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
      node.left = rotateLeft(node.left!);
      return rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
      node.right = rotateRight(node.right!);
      return rotateLeft(node);
    }

    return node;
  }, []);

  // Delete node
  const minValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  };

  const deleteNode = useCallback((node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;

    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
        if (!node) return null;
      } else {
        const temp = minValueNode(node.right);
        node.value = temp.value;
        node.right = deleteNode(node.right, temp.value);
      }
    }

    updateHeight(node);

    const balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && getBalance(node.left) >= 0) {
      return rotateRight(node);
    }

    // Left Right Case
    if (balance > 1 && getBalance(node.left) < 0) {
      node.left = rotateLeft(node.left!);
      return rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && getBalance(node.right) <= 0) {
      return rotateLeft(node);
    }

    // Right Left Case
    if (balance < -1 && getBalance(node.right) > 0) {
      node.right = rotateRight(node.right!);
      return rotateLeft(node);
    }

    return node;
  }, []);

  // Calculate positions for drawing
  const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

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

  const handleClear = () => {
    setRoot(null);
    setHistory([]);
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

  // Update positions when root changes
  useEffect(() => {
    if (root) {
      calculatePositions(root, 400, 50, 150);
    }
  }, [root]);

  // Render tree
  const renderTree = (node: TreeNode | null): React.JSX.Element[] => {
    if (!node || !node.x || !node.y) return [];

    const elements: React.JSX.Element[] = [];

    // Draw lines to children
    if (node.left && node.left.x && node.left.y) {
      elements.push(
        <line
          key={`line-left-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
        />
      );
      elements.push(...renderTree(node.left));
    }

    if (node.right && node.right.x && node.right.y) {
      elements.push(
        <line
          key={`line-right-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
        />
      );
      elements.push(...renderTree(node.right));
    }

    // Draw node
    const balance = getBalance(node);
    const isBalanced = Math.abs(balance) <= 1;

    elements.push(
      <g key={`node-${node.value}`}>
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill="currentColor"
          className={isBalanced ? "text-primary" : "text-destructive"}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary-foreground font-bold text-sm"
        >
          {node.value}
        </text>
        <text
          x={node.x}
          y={node.y + 40}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          h:{node.height} b:{balance}
        </text>
      </g>
    );

    return elements;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">
          {title || `Visualizador de Árvore ${type === "avl" ? "AVL" : "Rubro-Negra"}`}
        </h3>
        <p className="text-sm text-muted-foreground">
          Interaja com a árvore inserindo, removendo valores ou gerando uma árvore aleatória.
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

      {/* Stats */}
      {root && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Altura: {root.height}</Badge>
          <Badge variant="outline">Balanceamento: {getBalance(root)}</Badge>
          <Badge variant={Math.abs(getBalance(root)) <= 1 ? "default" : "destructive"}>
            {Math.abs(getBalance(root)) <= 1 ? "Balanceada" : "Desbalanceada"}
          </Badge>
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

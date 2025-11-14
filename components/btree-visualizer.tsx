"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, RotateCcw, Play, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface BTreeNode {
  keys: number[];
  children: BTreeNode[];
  isLeaf: boolean;
  x?: number;
  y?: number;
}

interface BTreeVisualizerProps {
  title?: string;
  order?: number; // B-Tree order (max children per node)
}

export function BTreeVisualizer({ title, order = 3 }: BTreeVisualizerProps) {
  const [root, setRoot] = useState<BTreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const t = Math.ceil(order / 2); // Minimum degree

  // Create a new node
  const createNode = (isLeaf: boolean = true): BTreeNode => {
    return {
      keys: [],
      children: [],
      isLeaf,
    };
  };

  // Split child of node at index
  const splitChild = (parent: BTreeNode, index: number): void => {
    const child = parent.children[index];
    const newNode = createNode(child.isLeaf);

    // Move second half of keys to new node
    newNode.keys = child.keys.splice(t);

    // Move second half of children if not leaf
    if (!child.isLeaf) {
      newNode.children = child.children.splice(t);
    }

    // Move middle key up to parent
    const middleKey = child.keys.pop()!;
    parent.keys.splice(index, 0, middleKey);
    parent.children.splice(index + 1, 0, newNode);
  };

  // Insert key into non-full node
  const insertNonFull = (node: BTreeNode, key: number): void => {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      // Insert key in sorted position
      node.keys.push(0);
      while (i >= 0 && key < node.keys[i]) {
        node.keys[i + 1] = node.keys[i];
        i--;
      }
      node.keys[i + 1] = key;
    } else {
      // Find child to insert into
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;

      // Split child if full
      if (node.children[i].keys.length === 2 * t - 1) {
        splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }
      insertNonFull(node.children[i], key);
    }
  };

  // Insert key into B-Tree
  const insert = (currentRoot: BTreeNode | null, key: number): BTreeNode => {
    if (!currentRoot) {
      const newNode = createNode();
      newNode.keys = [key];
      return newNode;
    }

    // Check for duplicate
    if (containsKey(currentRoot, key)) {
      toast.error("Valor já existe na árvore");
      return currentRoot;
    }

    // If root is full, split it
    if (currentRoot.keys.length === 2 * t - 1) {
      const newRoot = createNode(false);
      newRoot.children.push(currentRoot);
      splitChild(newRoot, 0);
      insertNonFull(newRoot, key);
      return newRoot;
    } else {
      insertNonFull(currentRoot, key);
      return currentRoot;
    }
  };

  // Check if key exists in tree
  const containsKey = (node: BTreeNode | null, key: number): boolean => {
    if (!node) return false;

    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && key === node.keys[i]) {
      return true;
    }

    if (node.isLeaf) {
      return false;
    }

    return containsKey(node.children[i], key);
  };

  // Calculate positions for drawing
  const calculatePositions = (node: BTreeNode | null, x: number, y: number, offset: number, level: number = 0): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

    const childCount = node.children.length;
    if (childCount > 0) {
      const spacing = offset / childCount;
      const startX = x - offset / 2;

      node.children.forEach((child, i) => {
        const childX = startX + spacing * i + spacing / 2;
        calculatePositions(child, childX, y + 100, offset / 2, level + 1);
      });
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

  const handleClear = () => {
    setRoot(null);
    setHistory([]);
    toast.info("Árvore limpa");
  };

  const handleRandom = () => {
    const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    let newRoot: BTreeNode | null = null;
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
      type: "btree",
      order,
      root,
      timestamp: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `btree-${order}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Árvore B exportada com sucesso");
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
          if (data.type !== "btree") {
            toast.error(`Arquivo é para ${data.type}, mas visualizador é btree`);
            return;
          }
          setRoot(data.root);
          setHistory([`Árvore B importada de ${file.name}`]);
          toast.success("Árvore B importada com sucesso");
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
      calculatePositions(root, 400, 50, 600);
    }
  }, [root]);

  // Render tree
  const renderTree = (node: BTreeNode | null): React.JSX.Element[] => {
    if (!node || !node.x || !node.y) return [];

    const elements: React.JSX.Element[] = [];
    const nodeWidth = Math.max(100, node.keys.length * 40);
    const nodeHeight = 40;

    // Draw lines to children
    node.children.forEach((child, i) => {
      if (child.x && child.y) {
        const childConnectionX = child.x;
        const parentConnectionX = node.x! - nodeWidth / 2 + (nodeWidth / (node.children.length + 1)) * (i + 1);

        elements.push(
          <motion.line
            key={`line-${node.x}-${node.y}-${i}`}
            x1={parentConnectionX}
            y1={node.y! + nodeHeight / 2}
            x2={childConnectionX}
            y2={child.y! - nodeHeight / 2}
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        );
        elements.push(...renderTree(child));
      }
    });

    // Draw node (rectangle with multiple keys)
    elements.push(
      <motion.g
        key={`node-${node.x}-${node.y}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <rect
          x={node.x! - nodeWidth / 2}
          y={node.y! - nodeHeight / 2}
          width={nodeWidth}
          height={nodeHeight}
          fill="currentColor"
          className="text-primary"
          stroke="currentColor"
          strokeWidth="2"
          rx="4"
        />

        {/* Draw dividers between keys */}
        {node.keys.map((_, i) => {
          if (i === 0) return null;
          const x = node.x! - nodeWidth / 2 + (nodeWidth / node.keys.length) * i;
          return (
            <line
              key={`divider-${i}`}
              x1={x}
              y1={node.y! - nodeHeight / 2}
              x2={x}
              y2={node.y! + nodeHeight / 2}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary-foreground"
              opacity="0.5"
            />
          );
        })}

        {/* Draw keys */}
        {node.keys.map((key, i) => {
          const keyX = node.x! - nodeWidth / 2 + (nodeWidth / node.keys.length) * (i + 0.5);
          return (
            <text
              key={`key-${i}`}
              x={keyX}
              y={node.y!}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-primary-foreground font-bold text-sm"
            >
              {key}
            </text>
          );
        })}
      </motion.g>
    );

    return elements;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">
          {title || `Visualizador de Árvore B (Ordem ${order})`}
        </h3>
        <p className="text-sm text-muted-foreground">
          Árvores B são estruturas balanceadas onde cada nó pode conter múltiplas chaves. Ordem {order} significa no máximo {order} filhos por nó.
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
          <Badge variant="outline">Ordem: {order}</Badge>
          <Badge variant="outline">Min Grau (t): {t}</Badge>
          <Badge variant="outline">Max Chaves/Nó: {2 * t - 1}</Badge>
          <Badge variant="default">Árvore B</Badge>
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

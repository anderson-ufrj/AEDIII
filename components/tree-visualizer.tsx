"use client";

import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, RotateCcw, Play, ChevronLeft, ChevronRight, Download, Upload, Pause, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  color?: 'red' | 'black'; // For Red-Black Trees
  x?: number;
  y?: number;
}

interface OperationStep {
  root: TreeNode | null;
  description: string;
  highlightedNodes?: number[];
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

  // Step-by-step mode
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState<OperationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Animation state
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);

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

  // Red-Black Tree Helper functions
  const isRed = (node: TreeNode | null): boolean => {
    return node !== null && node.color === 'red';
  };

  const flipColors = (node: TreeNode): void => {
    node.color = node.color === 'red' ? 'black' : 'red';
    if (node.left) node.left.color = node.left.color === 'red' ? 'black' : 'red';
    if (node.right) node.right.color = node.right.color === 'red' ? 'black' : 'red';
  };

  const rotateLeftRBT = (node: TreeNode): TreeNode => {
    const x = node.right!;
    node.right = x.left;
    x.left = node;
    x.color = node.color;
    node.color = 'red';
    return x;
  };

  const rotateRightRBT = (node: TreeNode): TreeNode => {
    const x = node.left!;
    node.left = x.right;
    x.right = node;
    x.color = node.color;
    node.color = 'red';
    return x;
  };

  const fixUpRBT = (node: TreeNode): TreeNode => {
    if (isRed(node.right) && !isRed(node.left)) {
      node = rotateLeftRBT(node);
    }
    if (node.left && isRed(node.left) && isRed(node.left.left)) {
      node = rotateRightRBT(node);
    }
    if (isRed(node.left) && isRed(node.right)) {
      flipColors(node);
    }
    return node;
  };

  // AVL Insert
  const insertAVL = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, left: null, right: null, height: 1 };
    }

    if (value < node.value) {
      node.left = insertAVL(node.left, value);
    } else if (value > node.value) {
      node.right = insertAVL(node.right, value);
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
  };

  // Red-Black Tree Insert
  const insertRBT = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, left: null, right: null, height: 1, color: 'red' };
    }

    if (value < node.value) {
      node.left = insertRBT(node.left, value);
    } else if (value > node.value) {
      node.right = insertRBT(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    updateHeight(node);
    return fixUpRBT(node);
  };

  // Unified insert function
  const insert = useCallback((node: TreeNode | null, value: number): TreeNode => {
    if (type === "rbt") {
      const result = insertRBT(node, value);
      if (result) result.color = 'black'; // Root is always black
      return result;
    } else {
      return insertAVL(node, value);
    }
  }, [type]);

  // Delete node helpers
  const minValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  };

  // AVL Delete
  const deleteAVL = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;

    if (value < node.value) {
      node.left = deleteAVL(node.left, value);
    } else if (value > node.value) {
      node.right = deleteAVL(node.right, value);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
        if (!node) return null;
      } else {
        const temp = minValueNode(node.right);
        node.value = temp.value;
        node.right = deleteAVL(node.right, temp.value);
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
  };

  // Red-Black Tree Delete (simplified)
  const moveRedLeft = (node: TreeNode): TreeNode => {
    flipColors(node);
    if (node.right && isRed(node.right.left)) {
      node.right = rotateRightRBT(node.right);
      node = rotateLeftRBT(node);
      flipColors(node);
    }
    return node;
  };

  const moveRedRight = (node: TreeNode): TreeNode => {
    flipColors(node);
    if (node.left && isRed(node.left.left)) {
      node = rotateRightRBT(node);
      flipColors(node);
    }
    return node;
  };

  const deleteMinRBT = (node: TreeNode): TreeNode | null => {
    if (!node.left) return null;

    if (!isRed(node.left) && node.left && !isRed(node.left.left)) {
      node = moveRedLeft(node);
    }

    node.left = deleteMinRBT(node.left!);
    return fixUpRBT(node);
  };

  const deleteRBT = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;

    if (value < node.value) {
      if (node.left && !isRed(node.left) && !isRed(node.left.left)) {
        node = moveRedLeft(node);
      }
      node.left = deleteRBT(node.left, value);
    } else {
      if (isRed(node.left)) {
        node = rotateRightRBT(node);
      }
      if (value === node.value && !node.right) {
        return null;
      }
      if (node.right && !isRed(node.right) && !isRed(node.right.left)) {
        node = moveRedRight(node);
      }
      if (value === node.value) {
        const min = minValueNode(node.right!);
        node.value = min.value;
        node.right = deleteMinRBT(node.right!);
      } else {
        node.right = deleteRBT(node.right, value);
      }
    }

    updateHeight(node);
    return fixUpRBT(node);
  };

  // Unified delete function
  const deleteNode = useCallback((node: TreeNode | null, value: number): TreeNode | null => {
    if (type === "rbt") {
      const result = deleteRBT(node, value);
      if (result) result.color = 'black'; // Root is always black
      return result;
    } else {
      return deleteAVL(node, value);
    }
  }, [type]);

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

  // Deep clone a tree for step tracking
  const cloneTree = (node: TreeNode | null): TreeNode | null => {
    if (!node) return null;
    return {
      value: node.value,
      left: cloneTree(node.left),
      right: cloneTree(node.right),
      height: node.height,
      color: node.color,
      x: node.x,
      y: node.y,
    };
  };

  // Step-by-step mode handlers
  const handleStepMode = () => {
    setStepMode(!stepMode);
    if (stepMode) {
      setSteps([]);
      setCurrentStep(0);
      setHighlightedNodes([]);
    }
    toast.info(stepMode ? "Modo passo-a-passo desativado" : "Modo passo-a-passo ativado");
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      setRoot(cloneTree(steps[newStep].root));
      setHighlightedNodes(steps[newStep].highlightedNodes || []);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setRoot(cloneTree(steps[newStep].root));
      setHighlightedNodes(steps[newStep].highlightedNodes || []);
    }
  };

  // Export/Import handlers
  const handleExport = () => {
    if (!root) {
      toast.error("Nenhuma árvore para exportar");
      return;
    }
    const data = {
      type,
      root,
      timestamp: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tree-${type}-${Date.now()}.json`;
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
          if (data.type !== type) {
            toast.error(`Arquivo é para ${data.type}, mas visualizador é ${type}`);
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
  }, [root]);

  // Render tree
  const renderTree = (node: TreeNode | null): React.JSX.Element[] => {
    if (!node || !node.x || !node.y) return [];

    const elements: React.JSX.Element[] = [];
    const isHighlighted = highlightedNodes.includes(node.value);

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

    // Draw node with appropriate coloring
    let nodeColor: string;
    let textColor: string = "fill-primary-foreground";

    if (type === "rbt") {
      // Red-Black Tree coloring
      nodeColor = node.color === 'red' ? "text-red-500" : "text-zinc-900 dark:text-zinc-100";
      if (node.color === 'black') {
        textColor = "fill-white dark:fill-zinc-900";
      }
    } else {
      // AVL Tree coloring (balanced/unbalanced)
      const balance = getBalance(node);
      const isBalanced = Math.abs(balance) <= 1;
      nodeColor = isBalanced ? "text-primary" : "text-destructive";
    }

    // Info text below node
    let infoText = "";
    if (type === "rbt") {
      infoText = `cor: ${node.color === 'red' ? 'V' : 'P'}`;
    } else {
      const balance = getBalance(node);
      infoText = `h:${node.height} b:${balance}`;
    }

    elements.push(
      <motion.g
        key={`node-${node.value}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHighlighted ? 1.2 : 1,
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
            r: isHighlighted ? 28 : 25,
          }}
          transition={{ duration: 0.3 }}
        />
        {isHighlighted && (
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
          className={`${textColor} font-bold text-sm`}
        >
          {node.value}
        </text>
        <text
          x={node.x}
          y={node.y + 40}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          {infoText}
        </text>
      </motion.g>
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
          disabled={animating || stepMode}
        />
        <Button onClick={handleInsert} disabled={animating || stepMode} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Inserir
        </Button>
        <Button onClick={handleDelete} disabled={animating || stepMode} variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-1" />
          Remover
        </Button>
        <Button onClick={handleRandom} disabled={animating || stepMode} variant="secondary" size="sm">
          <Play className="h-4 w-4 mr-1" />
          Aleatório
        </Button>
        <Button onClick={handleClear} disabled={animating || stepMode} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      </div>

      {/* Advanced Controls */}
      <div className="flex flex-wrap gap-2 mb-4 border-t pt-4">
        <Button onClick={handleStepMode} variant={stepMode ? "default" : "outline"} size="sm">
          {stepMode ? <Pause className="h-4 w-4 mr-1" /> : <PlayCircle className="h-4 w-4 mr-1" />}
          Modo Passo-a-Passo
        </Button>
        <Button onClick={handleExport} disabled={!root} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
        <Button onClick={handleImport} variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1" />
          Importar
        </Button>
      </div>

      {/* Step-by-step controls */}
      {stepMode && steps.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
          <Button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            size="sm"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <div className="text-sm font-medium">
              Passo {currentStep + 1} de {steps.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {steps[currentStep]?.description}
            </div>
          </div>
          <Button
            onClick={handleNextStep}
            disabled={currentStep === steps.length - 1}
            size="sm"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Stats */}
      {root && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Altura: {root.height}</Badge>
          {type === "avl" ? (
            <>
              <Badge variant="outline">Balanceamento: {getBalance(root)}</Badge>
              <Badge variant={Math.abs(getBalance(root)) <= 1 ? "default" : "destructive"}>
                {Math.abs(getBalance(root)) <= 1 ? "Balanceada" : "Desbalanceada"}
              </Badge>
            </>
          ) : (
            <>
              <Badge variant="outline">Cor da Raiz: {root.color === 'black' ? 'Preta' : 'Vermelha'}</Badge>
              <Badge variant="default">Árvore Rubro-Negra</Badge>
            </>
          )}
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

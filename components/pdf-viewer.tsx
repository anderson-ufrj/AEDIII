"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Pencil,
  Type,
  Eraser,
  Download,
  Trash2,
  X,
} from "lucide-react";

// Configure PDF.js worker with better error handling
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface DrawAnnotationData {
  path: Array<{ x: number; y: number }>;
  color: string;
  lineWidth: number;
}

interface TextAnnotationData {
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
}

interface Annotation {
  type: "draw" | "text";
  data: DrawAnnotationData | TextAnnotationData;
  page: number;
}

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

export function PDFViewer({ pdfUrl, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [tool, setTool] = useState<"none" | "draw" | "text" | "erase">("none");
  const [isDrawing, setIsDrawing] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [color, setColor] = useState("#2D8C46");
  const [lineWidth, setLineWidth] = useState(3);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Cache the canvas context
  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error loading PDF:", error);
  }, []);

  const changePage = useCallback((offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1 || newPage > numPages) return prevPageNumber;
      return newPage;
    });
  }, [numPages]);

  const changeScale = useCallback((delta: number) => {
    setScale((prevScale) => {
      const newScale = prevScale + delta;
      if (newScale < 0.5 || newScale > 2.5) return prevScale;
      return newScale;
    });
  }, []);

  // Drawing functions - optimized with useCallback
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== "draw") return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPath([{ x, y }]);
  }, [tool]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== "draw" || !ctxRef.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPath((prev) => {
      const newPath = [...prev, { x, y }];

      // Draw immediately using cached context
      const ctx = ctxRef.current;
      if (ctx && prev.length > 0) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const lastPoint = prev[prev.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      return newPath;
    });
  }, [isDrawing, tool, color, lineWidth]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentPath.length > 0) {
      const newAnnotation: Annotation = {
        type: "draw",
        data: {
          path: currentPath,
          color,
          lineWidth,
        },
        page: pageNumber,
      };
      setAnnotations((prev) => {
        const updated = [...prev, newAnnotation];
        // Save to localStorage
        localStorage.setItem(`pdf-annotations-${pdfUrl}`, JSON.stringify(updated));
        return updated;
      });
    }
    setIsDrawing(false);
    setCurrentPath([]);
  }, [isDrawing, currentPath, color, lineWidth, pageNumber, pdfUrl]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const clearAnnotationsOnPage = useCallback(() => {
    setAnnotations((prev) => {
      const filtered = prev.filter((a) => a.page !== pageNumber);
      localStorage.setItem(`pdf-annotations-${pdfUrl}`, JSON.stringify(filtered));
      return filtered;
    });
    clearCanvas();
  }, [pageNumber, pdfUrl, clearCanvas]);

  // Load annotations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`pdf-annotations-${pdfUrl}`);
    if (saved) {
      try {
        setAnnotations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load annotations", e);
      }
    }
  }, [pdfUrl]);

  // Memoize page annotations to avoid refiltering on every render
  const pageAnnotations = useMemo(() => {
    return annotations.filter((a) => a.page === pageNumber);
  }, [annotations, pageNumber]);

  // Redraw annotations when page changes - optimized
  const redrawAnnotations = useCallback(() => {
    clearCanvas();
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Batch canvas operations for better performance
    requestAnimationFrame(() => {
      pageAnnotations.forEach((annotation) => {
        if (annotation.type === "draw") {
          const { path, color: pathColor, lineWidth: pathWidth } = annotation.data;
          ctx.strokeStyle = pathColor;
          ctx.lineWidth = pathWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          path.forEach((point: { x: number; y: number }, index: number) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
        }
      });
    });
  }, [pageAnnotations, clearCanvas]);

  useEffect(() => {
    redrawAnnotations();
  }, [redrawAnnotations]);

  // Resize canvas to match PDF - optimized with ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      try {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          // Redraw after resize
          redrawAnnotations();
        }
      } catch (error) {
        console.error("Error resizing canvas:", error);
      }
    };

    // Initial resize with delay to ensure PDF is rendered
    const timeoutId = setTimeout(resizeCanvas, 100);

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [scale, pageNumber, redrawAnnotations]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col bg-white dark:bg-zinc-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium">
              Página {pageNumber} de {numPages}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Zoom */}
            <Button variant="outline" size="icon" onClick={() => changeScale(-0.1)}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[4rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button variant="outline" size="icon" onClick={() => changeScale(0.1)}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            {/* Drawing Tools */}
            <div className="border-l pl-2 ml-2 flex gap-2">
              <Button
                variant={tool === "draw" ? "default" : "outline"}
                size="icon"
                onClick={() => setTool(tool === "draw" ? "none" : "draw")}
                title="Desenhar"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === "text" ? "default" : "outline"}
                size="icon"
                onClick={() => setTool(tool === "text" ? "none" : "text")}
                title="Texto"
                disabled
              >
                <Type className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={clearAnnotationsOnPage}
                title="Limpar anotações desta página"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Color picker */}
            {tool === "draw" && (
              <div className="flex gap-2 items-center border-l pl-2 ml-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            )}
          </div>
        </div>

        {/* PDF Viewer with Annotation Layer */}
        <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-800 p-4">
          <div className="flex justify-center">
            <div className="relative" ref={containerRef}>
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className="shadow-lg"
                loading={
                  <div className="flex items-center justify-center min-h-[600px]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Carregando PDF...</p>
                    </div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center min-h-[600px]">
                    <div className="text-center">
                      <p className="text-destructive font-medium mb-2">Erro ao carregar PDF</p>
                      <p className="text-sm text-muted-foreground">Tente recarregar a página</p>
                    </div>
                  </div>
                }
                options={{
                  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                  cMapPacked: true,
                  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <div className="flex items-center justify-center min-h-[600px]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }
                />
              </Document>

              {/* Annotation Canvas Overlay - The "Magic Glass" */}
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={`Área de anotações da página ${pageNumber}. ${pageAnnotations.length} anotações presentes.`}
                tabIndex={tool === "draw" ? 0 : -1}
                className={`absolute top-0 left-0 ${
                  tool === "draw" ? "cursor-crosshair" : "pointer-events-none"
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {tool === "draw" && "✏️ Modo desenho ativo - clique e arraste para desenhar"}
            {tool === "none" && "💡 Dica: Use as ferramentas acima para fazer anotações"}
          </p>
          <p className="text-xs text-muted-foreground">
            {pageAnnotations.length} anotação(ões) nesta página
          </p>
        </div>
      </Card>
    </div>
  );
}

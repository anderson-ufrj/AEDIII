"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockWithActionsProps {
  code: string;
  language: string;
  className?: string;
  children: React.ReactNode;
  onCompile?: (code: string, language: "c" | "cpp") => void;
}

export function CodeBlockWithActions({
  code,
  language,
  className,
  children,
  onCompile,
}: CodeBlockWithActionsProps) {
  const [copied, setCopied] = useState(false);
  const isCompilable = language === "c" || language === "cpp" || language === "C";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  const handleCompile = () => {
    if (onCompile) {
      onCompile(code, language === "cpp" ? "cpp" : "c");
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          onClick={handleCopy}
          size="sm"
          variant="secondary"
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copiar
            </>
          )}
        </Button>
        {isCompilable && (
          <Button
            onClick={handleCompile}
            size="sm"
            className="gap-2"
          >
            <Play className="h-3 w-3" />
            Executar
          </Button>
        )}
      </div>
      <pre className="!bg-zinc-900 !p-4 !rounded-lg overflow-x-auto !my-4">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

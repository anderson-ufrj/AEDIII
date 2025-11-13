"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PDFViewer } from "@/components/pdf-viewer";
import { CodeCompiler } from "@/components/code-compiler";
import { ArrowLeft, FileText, FileDown, ExternalLink, Code2, Play } from "lucide-react";
import type { CourseContent } from "@/lib/types";

interface ContentDetailClientProps {
  content: CourseContent;
}

export function ContentDetailClient({ content }: ContentDetailClientProps) {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [codeLanguage, setCodeLanguage] = useState<"cpp" | "c">("cpp");

  const handleRunCode = (code: string, language: "cpp" | "c" = "cpp") => {
    setSelectedCode(code);
    setCodeLanguage(language);
    setShowCompiler(true);
  };

  // Get PDF URL from source filename
  const pdfUrl = content.source ? `/pdfs/${content.source}` : null;

  return (
    <>
      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/content">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao conteúdo
              </Link>
            </Button>
          </div>

          {/* Title Card */}
          <Card className="p-8 mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {content.author && <span>{content.author}</span>}
                    {content.pages > 0 && <span>•</span>}
                    {content.pages > 0 && <span>{content.pages} páginas</span>}
                    {content.source && <span>•</span>}
                    {content.source && <span>{content.source}</span>}
                  </div>
                </div>
              </div>

              {/* PDF Actions */}
              {pdfUrl && (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => setShowPDFViewer(true)}
                    className="gap-2"
                  >
                    <FileDown className="h-4 w-4" />
                    Abrir PDF Original
                  </Button>
                  <Button variant="outline" asChild className="gap-2">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Nova Aba
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {pdfUrl && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  💡 Dica: Clique em "Abrir PDF Original" para visualizar o material com ferramentas de
                  anotação interativas!
                </p>
              </div>
            )}
          </Card>

          {/* Markdown Content */}
          <Card className="p-8">
            <article className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : null;
                    const code = String(children).replace(/\n$/, "");
                    const isCppOrC = language === "cpp" || language === "c" || language === "c++";

                    if (inline) {
                      return (
                        <code
                          className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <div className="relative group">
                        <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                        {isCppOrC && (
                          <Button
                            onClick={() => handleRunCode(code, language === "c" ? "c" : "cpp")}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity gap-2"
                            size="sm"
                          >
                            <Play className="h-3 w-3" />
                            Executar
                          </Button>
                        )}
                      </div>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <img className="rounded-lg shadow-md my-6" {...props} alt={props.alt || "Image"} />
                  ),
                  a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                }}
              >
                {content.content}
              </ReactMarkdown>
            </article>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/content">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao conteúdo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Ir para início</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {showPDFViewer && pdfUrl && (
        <PDFViewer pdfUrl={pdfUrl} onClose={() => setShowPDFViewer(false)} />
      )}

      {/* Code Compiler Modal */}
      {showCompiler && (
        <CodeCompiler
          initialCode={selectedCode}
          language={codeLanguage}
          onClose={() => setShowCompiler(false)}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, FileDown, ExternalLink, Play, Copy, Check } from "lucide-react";
import type { CourseContent } from "@/lib/types";
import { toast } from "sonner";

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@/components/pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

// Dynamically import CodeCompiler to avoid SSR issues
const CodeCompiler = dynamic(
  () => import("@/components/code-compiler").then((mod) => mod.CodeCompiler),
  { ssr: false }
);

// Dynamically import NotesPanel to avoid SSR issues
const NotesPanel = dynamic(
  () => import("@/components/notes-panel").then((mod) => mod.NotesPanel),
  { ssr: false }
);

// Import ReadingModeWrapper
import { ReadingModeWrapper } from "@/components/reading-mode-wrapper";
import { ContentSidePanel } from "@/components/content-side-panel";
import { CodeBlockWithActions } from "@/components/code-block-with-actions";

interface ContentDetailClientProps {
  content: CourseContent;
  previous?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
}

export function ContentDetailClient({ content, previous, next }: ContentDetailClientProps) {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [compilerCode, setCompilerCode] = useState("");
  const [compilerLanguage, setCompilerLanguage] = useState<"c" | "cpp">("c");

  // Get PDF URL from source filename
  const pdfUrl = content.source ? `/pdfs/${content.source}` : null;

  // Function to open compiler with code
  const openCompiler = (code: string, language: "c" | "cpp") => {
    setCompilerCode(code);
    setCompilerLanguage(language);
    setShowCompiler(true);
  };

  return (
    <>
      {/* Content Section */}
      <div>

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

            </div>
          </Card>

          {/* Markdown Content */}
          <ReadingModeWrapper>
            <Card className="p-8">
              <article className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 tracking-tight text-foreground border-b pb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5 tracking-tight text-foreground" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 tracking-tight text-foreground" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-5 leading-relaxed text-lg" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed text-lg" {...props} />,
                  code: ({ node, inline, className, children, ...props }: any) => {
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

                    // Detect language from className (format: language-c or language-cpp)
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";
                    const isCompilable = language === "c" || language === "cpp" || language === "C";

                    // Extract text content from children (handles React elements)
                    const extractText = (children: any): string => {
                      if (typeof children === 'string') return children;
                      if (Array.isArray(children)) {
                        return children.map(extractText).join('');
                      }
                      if (children?.props?.children) {
                        return extractText(children.props.children);
                      }
                      return '';
                    };

                    const codeString = extractText(children).replace(/\n$/, "");

                    return (
                      <CodeBlockWithActions
                        code={codeString}
                        language={language}
                        className={className}
                        onCompile={openCompiler}
                      >
                        {children}
                      </CodeBlockWithActions>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <img className="rounded-lg shadow-md my-6" {...props} alt={props.alt || "Image"} />
                  ),
                  a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6 -mx-4 sm:mx-0">
                      <table className="min-w-full divide-y divide-border" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-muted" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="divide-y divide-border bg-background" {...props} />
                  ),
                  tr: ({ node, ...props }) => <tr className="hover:bg-muted/50 transition-colors" {...props} />,
                  th: ({ node, ...props }) => (
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-4 py-3 text-sm whitespace-nowrap" {...props} />
                  ),
                }}
              >
                {content.content}
              </ReactMarkdown>
            </article>
          </Card>
          </ReadingModeWrapper>

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

      {/* Side Panel */}
      <ContentSidePanel
        contentSlug={content.slug}
        contentTitle={content.title}
        pdfUrl={pdfUrl}
        onOpenPDF={() => setShowPDFViewer(true)}
        previous={previous}
        next={next}
      />

      {/* PDF Viewer Modal */}
      {showPDFViewer && pdfUrl && (
        <PDFViewer pdfUrl={pdfUrl} onClose={() => setShowPDFViewer(false)} />
      )}

      {/* Code Compiler Modal */}
      {showCompiler && (
        <CodeCompiler
          initialCode={compilerCode}
          language={compilerLanguage}
          onClose={() => setShowCompiler(false)}
        />
      )}
    </>
  );
}

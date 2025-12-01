import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CONTENT_MAPPING } from "@/lib/types";

// Constants for input validation
const MAX_QUERY_LENGTH = 200;
const MIN_QUERY_LENGTH = 2;
const VALID_CATEGORIES = ["arvores", "hash", "arquivos", "compressao", "algoritmos", "exercicios"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const categoryFilter = searchParams.get("category");

  // Input validation: empty query
  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  // Input validation: query too short
  if (query.trim().length < MIN_QUERY_LENGTH) {
    return NextResponse.json(
      { results: [], error: "Query must be at least 2 characters" },
      { status: 400 }
    );
  }

  // Input validation: query too long (prevent DoS)
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { results: [], error: "Query too long" },
      { status: 400 }
    );
  }

  // Input validation: category filter
  if (categoryFilter && !VALID_CATEGORIES.includes(categoryFilter)) {
    return NextResponse.json(
      { results: [], error: "Invalid category" },
      { status: 400 }
    );
  }

  try {
    const contentDir = path.join(process.cwd(), "lib/content");
    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));

    const results = files
      .map((filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const slug = filename.replace(/\.md$/, "");
        const title = data.title || slug;

        // Get category from CONTENT_MAPPING
        const contentInfo = CONTENT_MAPPING[slug];
        const category = contentInfo?.category || "outros";

        // Filter by category if specified
        if (categoryFilter && category !== categoryFilter) {
          return null;
        }

        // Busca case-insensitive no título e conteúdo
        const lowerQuery = query.toLowerCase();
        const titleMatch = title.toLowerCase().includes(lowerQuery);
        const contentMatch = content.toLowerCase().includes(lowerQuery);

        if (!titleMatch && !contentMatch) {
          return null;
        }

        // Cria excerpt do conteúdo onde aparece a query
        let excerpt = "";
        if (contentMatch) {
          const contentLower = content.toLowerCase();
          const matchIndex = contentLower.indexOf(lowerQuery);
          const start = Math.max(0, matchIndex - 60);
          const end = Math.min(content.length, matchIndex + query.length + 60);
          excerpt = content.slice(start, end).trim();

          // Adiciona reticências se não começar/terminar no início/fim
          if (start > 0) excerpt = "..." + excerpt;
          if (end < content.length) excerpt = excerpt + "...";
        } else {
          // Se match foi só no título, pega os primeiros 120 chars do conteúdo
          excerpt = content.slice(0, 120).trim() + "...";
        }

        // Remove quebras de linha e espaços extras do excerpt
        excerpt = excerpt.replace(/\s+/g, " ").trim();

        return {
          slug,
          title,
          excerpt,
          category,
          // Score para ordenação (título tem mais peso)
          score: titleMatch ? 2 : 1,
        };
      })
      .filter((result) => result !== null)
      .sort((a, b) => b!.score - a!.score) // Ordena por relevância
      .slice(0, 10) // Limita a 10 resultados
      .map(({ slug, title, excerpt, category }) => ({ slug, title, excerpt, category })); // Remove score do resultado final

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Erro na busca:", error);
    return NextResponse.json({ results: [], error: "Erro ao buscar conteúdo" }, { status: 500 });
  }
}

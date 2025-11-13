# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational website for the "Algoritmos e Estruturas de Dados III" (AED III) course at IFSULDEMINAS. The site serves course material that was converted from PDF to Markdown, organized by categories like balanced trees, hash tables, file manipulation, compression, and algorithms.

**Tech Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, React Markdown

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (runs type checking and builds)
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report

# PDF Conversion (if needed)
source venv/bin/activate
python3 scripts/extract_pdfs.py --docs-dir ./docs --output-dir ./content
```

## Architecture

### Content System

Content is stored as Markdown files in `lib/content/` and loaded server-side through a centralized system:

- **Content Loading**: `lib/content-loader.ts` reads Markdown files with gray-matter frontmatter
- **Content Mapping**: `lib/types.ts` contains `CONTENT_MAPPING` that maps slugs to categories and display order
- **Categories**: 6 predefined categories (arvores, hash, arquivos, compressao, algoritmos, exercicios) defined in `COURSE_CATEGORIES`

**Important**: When adding new content, you must update `CONTENT_MAPPING` in `lib/types.ts` with the slug, category, order, and title.

### Static Generation Pattern

The site uses Next.js static generation for all content pages:

```typescript
// app/content/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

All content pages are generated at build time. The `generateStaticParams` function tells Next.js which pages to pre-render.

### Client/Server Component Separation

The project follows Next.js 16 patterns:

- **Server Components**: Pages, layouts, and data fetching (default)
- **Client Components**: Interactive features marked with `"use client"`
  - `ContentDetailClient`: Handles PDF viewer and code compiler modals
  - `PDFViewer`, `CodeCompiler`: Heavy interactive components
  - Search, theme toggle, progress tracking

**Pattern**: Pages fetch data server-side, then pass to client components for interactivity.

### Dynamic Imports

Heavy client components use dynamic imports to reduce initial bundle size and avoid SSR issues:

```typescript
const PDFViewer = dynamic(
  () => import("@/components/pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);
```

This is critical for components using browser-only APIs (PDF.js, Fabric.js for annotations).

### API Routes

- **Search**: `app/api/search/route.ts` - Server-side search through Markdown content
  - Searches both titles and content
  - Returns excerpts with context
  - Case-insensitive, limited to 10 results

### Component Organization

- `components/` - Custom components
  - `content-detail-client.tsx` - Main content renderer with ReactMarkdown
  - `pdf-viewer.tsx` - Interactive PDF viewer with annotation tools
  - `code-compiler.tsx` - In-browser C/C++ compiler
  - `search-bar.tsx`, `table-of-contents.tsx`, etc.
- `components/ui/` - shadcn/ui components (button, card, accordion, etc.)

### Markdown Rendering

Content is rendered with ReactMarkdown with custom components for styling. Code blocks in C/C++ get a "Run in Compiler" button that opens an interactive compiler modal.

### PWA Features

The site is a Progressive Web App:
- Manifest at `/manifest.json` (generated via route handler)
- Service worker registration in `components/pwa-register.tsx`
- Optimized for mobile with responsive design

## Path Aliases

Uses `@/*` to reference root directory:
```typescript
import { Button } from "@/components/ui/button";
import { getAllContent } from "@/lib/content-loader";
```

## Key Files

- `lib/types.ts` - Type definitions and `CONTENT_MAPPING` (edit when adding content)
- `lib/content-loader.ts` - Server-side content loading functions
- `app/content/[slug]/page.tsx` - Dynamic content page with static generation
- `components/content-detail-client.tsx` - Main content display with markdown rendering

## Adding New Content

1. Add Markdown file to `lib/content/`
2. Add mapping to `CONTENT_MAPPING` in `lib/types.ts`:
   ```typescript
   'your-slug': { category: 'arvores', order: 6, title: 'Your Title' }
   ```
3. (Optional) Add corresponding PDF to `public/pdfs/`
4. Run `npm run build` to regenerate static pages

## Special Considerations

- All content pages are statically generated - changes to content require rebuild
- Client components must handle hydration carefully (use dynamic imports for browser-only code)
- PDF.js worker configuration is handled in `pdf-viewer.tsx` with special path handling
- The code compiler uses a third-party API for C/C++ compilation
- Accessibility features: skip links, ARIA labels, VLibras widget for Brazilian Sign Language

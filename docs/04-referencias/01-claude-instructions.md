---
title: "Instruções para Claude Code"
author: "Anderson Henrique da Silva"
location: "Minas Gerais, Brazil"
date: "2025-11-18"
category: "Referência"
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AED III Website** - Interactive educational platform for the Algorithms and Data Structures III course at IFSULDEMINAS. Features course materials converted from PDF to Markdown, organized by categories (balanced trees, hash tables, file manipulation, compression, algorithms), with an integrated C/C++ compiler, PDF viewer with annotations, and modern Progressive Web App features.

**Tech Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, React Markdown, pdfjs-dist, Vitest

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000 (with Turbopack)
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
deactivate
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

### Interactive Features

**C/C++ Online Compiler**:
- Component: `components/code-compiler.tsx`
- API: Judge0 CE via RapidAPI
- Language detection: Automatically identifies C/C++ code blocks
- Environment variable (optional): `NEXT_PUBLIC_JUDGE0_API_KEY`
- Features: Live compilation, stdin/stdout, error display, 2s CPU limit, 128MB memory limit
- Integration: Dynamically imported in `content-detail-client.tsx`

**PDF Viewer with Annotations**:
- Component: `components/pdf-viewer.tsx`
- Library: pdfjs-dist + Fabric.js
- Features: Canvas-based rendering, drawing tools, persistent annotations (localStorage)
- Performance optimizations: useCallback, useMemo, canvas context caching, requestAnimationFrame
- See `docs/OPTIMIZATIONS.md` for detailed performance notes

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

Content is rendered with ReactMarkdown with plugins and custom components:
- **Plugins**: `remark-gfm` (GitHub Flavored Markdown), `rehype-highlight` (syntax highlighting)
- **Custom components**: Styled headings, paragraphs, code blocks, lists, blockquotes
- **Interactive code blocks**: C/C++ code blocks get an "Execute in Compiler" button on hover that opens the Judge0-powered compiler modal
- **Code fence example**:
  ````markdown
  ```c
  #include <stdio.h>
  int main() { printf("Hello"); }
  ```
  ````

### PWA Features

The site is a Progressive Web App:
- Manifest at `/manifest.json` (generated via route handler)
- Service worker registration in `components/pwa-register.tsx`
- Optimized for mobile with responsive design

## Project Structure

```
AEDIII/
├── app/                         # Next.js App Router
│   ├── api/search/             # Server-side search API
│   ├── content/
│   │   ├── [slug]/page.tsx    # Dynamic content pages (24 static pages)
│   │   └── page.tsx           # Content listing with category tabs
│   ├── globals.css            # Tailwind + theme CSS variables
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── content-detail-client.tsx  # Main content renderer
│   ├── pdf-viewer.tsx         # PDF + annotation system
│   ├── code-compiler.tsx      # Judge0 compiler integration
│   ├── header.tsx, footer.tsx # Layout components
│   └── [other components]
├── lib/
│   ├── content/               # All markdown files (19 files)
│   │   ├── images/           # Extracted images from PDFs
│   │   └── *.md              # Course materials
│   ├── content-loader.ts     # Server-side content loading
│   ├── types.ts              # TypeScript interfaces + CONTENT_MAPPING
│   └── utils.ts              # Utility functions
├── public/
│   └── pdfs/                 # Original PDF files
├── __tests__/                # Vitest test files
├── scripts/
│   └── extract_pdfs.py       # PDF → Markdown converter
├── docs/                     # Source PDFs (19 files)
├── hooks/                    # Custom React hooks (use-mobile.ts)
├── vitest.config.ts          # Testing configuration
└── next.config.ts            # Next.js configuration
```

## Path Aliases

Uses `@/*` to reference root directory:
```typescript
import { Button } from "@/components/ui/button";
import { getAllContent } from "@/lib/content-loader";
```

Configured in:
- `tsconfig.json`: TypeScript path resolution
- `vitest.config.ts`: Test imports resolution

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

## Testing

The project uses Vitest with React Testing Library:
- **Config**: `vitest.config.ts` - Uses jsdom environment, global test utilities
- **Setup**: `vitest.setup.ts` - Extends matchers with @testing-library/jest-dom
- **Test files**: Located in `__tests__/` directory
- **Coverage**: Run `npm run test:coverage` to generate coverage report
- **Watch mode**: Use `npm test` for continuous testing during development

## Troubleshooting Common Issues

### Content Issues
- **Missing content page**: Check that slug exists in `CONTENT_MAPPING` in `lib/types.ts`
- **Content not displaying**: Verify `.md` file exists in `lib/content/` with correct slug name
- **Images not showing**: Ensure images are in `lib/content/images/` and paths are relative (`../images/file.png`)
- **Build errors**: Run `npm run build` to see specific TypeScript or content loading errors

### PDF Issues
- **PDF not loading**: Confirm PDF exists in `public/pdfs/` with exact slug name (case-sensitive)
- **PDF path errors**: PDFs accessed via `/pdfs/{slug}.pdf` - verify public folder structure
- **Annotations not saving**: Check browser localStorage is enabled and not full

### Compiler Issues
- **Rate limiting**: Without `NEXT_PUBLIC_JUDGE0_API_KEY`, free tier has strict limits
- **Compilation timeout**: Default 2s CPU limit - check for infinite loops in student code
- **No "Execute" button**: Verify code block has `language-c` or `language-cpp` class in markdown

### Build/Deploy Issues
- **Build fails**: Check all content files have valid frontmatter (title, author, pages, source)
- **Hydration errors**: Ensure client components use dynamic imports for browser-only code
- **Type errors**: Verify all interfaces match definitions in `lib/types.ts`
- **Missing dependencies**: Run `npm install` to ensure all packages are installed

### Performance Issues
- **Slow PDF rendering**: Check canvas optimization in `pdf-viewer.tsx` - may need to adjust render quality
- **Memory leaks**: Ensure proper cleanup in useEffect hooks, especially in PDF viewer
- **Large bundle size**: Verify dynamic imports are used for heavy components

## Special Considerations

- **Static Generation**: All content pages are pre-rendered at build time - content changes require rebuild
- **Hydration**: Client components must handle hydration carefully (use dynamic imports for browser-only code)
- **PDF.js Worker**: Worker configuration handled in `pdf-viewer.tsx` with CDN path for production
- **Code Compilation**: Uses Judge0 CE API for C/C++ compilation (rate-limited without API key)
- **Accessibility**: Skip links, ARIA labels, VLibras widget for Brazilian Sign Language
- **Performance**: PDF viewer uses advanced optimizations (see Interactive Features section)
- **Content Mapping**: ALWAYS update `CONTENT_MAPPING` in `lib/types.ts` when adding new content
- **Image Paths**: In markdown files, images must use relative paths: `../images/filename.png`
- **Theme Colors**: IFSULDEMINAS brand colors defined in `app/globals.css` (Green #2D8C46, Red #C41E3A)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AED III Website** - Interactive educational platform for the Algorithms and Data Structures III course at IFSULDEMINAS. A Next.js-based website that displays converted course materials (PDFs → Markdown) with an integrated C/C++ compiler, PDF viewer with annotations, and modern UI.

**Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui

## Common Development Commands

### Development Workflow
```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### PDF Content Extraction
```bash
# From repository root
source venv/bin/activate
python3 scripts/extract_pdfs.py --docs-dir ./docs --output-dir ./content
deactivate

# After extraction, copy to website
cp -r content/* aed3-website/lib/content/
```

## Architecture & Key Patterns

### Content Management System

The project uses a **static content loading system** with three core files:

1. **`lib/types.ts`**: Defines content structure and mappings
   - `CONTENT_MAPPING`: Maps slugs to categories/order/titles
   - `COURSE_CATEGORIES`: Defines the 6 main categories
   - Must be updated when adding new content

2. **`lib/content-loader.ts`**: Server-side content loading
   - `getAllContent()`: Loads all markdown files with frontmatter
   - `getContentBySlug(slug)`: Loads specific content by slug
   - Reads from `lib/content/*.md` at build time

3. **Markdown Files** in `lib/content/`:
   - Frontmatter: title, author, pages, source
   - Images referenced as: `../images/filename.png`
   - Each file corresponds to one course material

### Routing Architecture

**Next.js App Router** structure:
- `/` - Homepage (app/page.tsx): Hero + category cards
- `/content` - Content listing (app/content/page.tsx): Tabbed view by category
- `/content/[slug]` - Individual material (app/content/[slug]/page.tsx): Markdown + PDF viewer

**Static Generation**: All pages are pre-rendered at build time using `generateStaticParams()` in dynamic routes.

### Component Organization

**Client Components** (marked with `"use client"`):
- `content-detail-client.tsx`: Handles markdown rendering + PDF viewer integration
- `pdf-viewer.tsx`: Canvas-based PDF viewer with annotation system
- `code-compiler.tsx`: Judge0-powered C/C++ compiler interface

**Server Components** (default):
- Page layouts and static content loading
- Header, footer, and non-interactive UI

### Performance Optimizations

The PDF viewer (`pdf-viewer.tsx`) uses advanced optimizations:
- `useCallback` for all event handlers (prevent re-renders)
- `useMemo` for filtered annotations per page
- Canvas context caching in `useRef` (avoid repeated `getContext` calls)
- `requestAnimationFrame` for smooth canvas redrawing
- `ResizeObserver` for efficient canvas resizing
- Annotations stored in `localStorage` with debounced updates

See `docs/OPTIMIZATIONS.md` for detailed performance notes.

## Adding New Content

### Step 1: Add PDF to `docs/` directory

### Step 2: Run extraction script
```bash
source venv/bin/activate
python3 scripts/extract_pdfs.py
deactivate
```

### Step 3: Update `lib/types.ts`
Add entry to `CONTENT_MAPPING`:
```typescript
'new-slug-name': {
  category: 'arvores', // or hash, arquivos, compressao, algoritmos, exercicios
  order: 6,            // Next order in category
  title: 'Display Title'
}
```

### Step 4: Copy markdown file
```bash
cp content/new-content.md aed3-website/lib/content/
```

### Step 5: Test build
```bash
npm run build
```

## Environment Variables

**Optional**: Judge0 API key for C/C++ compiler
```bash
# Create .env.local
NEXT_PUBLIC_JUDGE0_API_KEY=your_key_here
```

Without API key, the compiler uses free rate-limited access.

## Interactive Features

### C/C++ Online Compiler
- **Component**: `components/code-compiler.tsx`
- **Integration**: Dynamically imported in `content-detail-client.tsx`
- **API**: Uses Judge0 CE (Community Edition) via RapidAPI
- **Language Detection**: Automatically identifies C/C++ code blocks from markdown
- **Features**:
  - Live code compilation and execution
  - Input/output tabs for stdin/stdout
  - Error and compilation output display
  - CPU time limit: 2 seconds
  - Memory limit: 128MB
- **Environment Variable** (optional): `NEXT_PUBLIC_JUDGE0_API_KEY`
  - Without key: Uses rate-limited free tier
  - With key: Higher rate limits for production

### How It Works
1. Markdown is rendered with `react-markdown`
2. Code blocks with `language-c` or `language-cpp` class are detected
3. "Execute in Compiler" button appears on hover
4. Clicking opens full-screen compiler modal with the code pre-loaded
5. Students can modify, compile, and run code instantly

## Important Implementation Details

### PDF Loading
- PDFs located in `public/pdfs/` directory
- Accessed via `/pdfs/{slug}.pdf` paths
- Rendered using `pdfjs-dist` library
- Worker loaded from CDN in production

### Code Blocks in Markdown
- **Syntax highlighting** via `rehype-highlight` with `highlight.js`
- **Interactive C/C++ compiler**: Automatically detects C/C++ code blocks
  - Shows "Execute in Compiler" button on hover
  - Opens full Judge0-powered compiler in modal
  - Students can run and test code examples directly
- Code blocks use GitHub-style markdown fences with language tags:
  ```markdown
  ```c
  #include <stdio.h>
  int main() { printf("Hello"); }
  ```
  ```

### Markdown Rendering
Uses `react-markdown` with plugins:
- `remark-gfm`: GitHub Flavored Markdown (tables, strikethrough, etc.)
- `rehype-highlight`: Code syntax highlighting

### shadcn/ui Components
Installed components are in `components/ui/`:
- Custom theme in `app/globals.css`
- IFSULDEMINAS colors: Green (#2D8C46) and Red (#C41E3A)
- Uses Tailwind CSS 4 with CSS variables for theming

## File Organization Logic

```
AEDIII/
├── app/                         # Next.js App Router
│   ├── content/[slug]/page.tsx # Dynamic content pages
│   ├── globals.css             # Tailwind + theme variables
│   └── page.tsx                # Homepage
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── content-detail-client.tsx
│   ├── pdf-viewer.tsx          # Core PDF + annotation logic
│   └── code-compiler.tsx
├── lib/
│   ├── content/                # All markdown files
│   │   ├── images/            # Extracted images from PDFs
│   │   └── *.md               # Course materials
│   ├── content-loader.ts       # Content loading functions
│   └── types.ts               # Interfaces + mappings
├── public/
│   └── pdfs/                  # Original PDF files
├── scripts/
│   └── extract_pdfs.py        # PDF → Markdown converter
└── docs/                      # Source PDFs
```

## Testing Content Changes

Always verify locally before committing:
```bash
# Clean build
rm -rf .next
npm run build

# Test all routes work
npm run start
# Visit http://localhost:3000
# Check: /, /content, /content/001_-_AVL
```

## Common Issues & Solutions

### Missing Content
- Check `CONTENT_MAPPING` in `lib/types.ts` has entry for slug
- Verify `.md` file exists in `lib/content/`
- Run build to see specific error messages

### PDF Not Loading
- Confirm PDF exists in `public/pdfs/` with exact slug name
- PDF must be named exactly like the slug (case-sensitive)

### Images Not Displaying
- Image paths must be relative: `../images/filename.png`
- Images must exist in `lib/content/images/`
- Check markdown frontmatter for correct paths

### Build Errors
- TypeScript errors: Check all types match interfaces in `lib/types.ts`
- Missing dependencies: Run `npm install`
- Content errors: Validate markdown frontmatter format

## Deployment Notes

**Vercel** (recommended):
- Auto-deploys from `main` branch
- No special configuration needed
- Build command: `npm run build`
- Output directory: `.next`

Static generation ensures:
- Fast page loads (pre-rendered HTML)
- No server runtime required
- Optimal SEO
- 24 pages generated per build

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContentDetailClient } from "@/components/content-detail-client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollToTop } from "@/components/scroll-to-top";
import { getAllSlugs, getContentBySlug, getAdjacentContent } from "@/lib/content-loader";
import { COURSE_CATEGORIES } from "@/lib/types";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  if (!content) {
    return {
      title: "Conteúdo não encontrado | AED III",
    };
  }

  const categoryInfo = COURSE_CATEGORIES[content.category];
  const categoryName = categoryInfo?.name || content.category;

  // Extract first 160 chars of content for description
  const description = content.content
    .replace(/[#*`\[\]]/g, "") // Remove markdown syntax
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim()
    .slice(0, 160);

  return {
    title: `${content.title} | AED III`,
    description: `${description}...`,
    keywords: [
      "AED III",
      "algoritmos",
      "estruturas de dados",
      categoryName,
      content.title,
      "IFSULDEMINAS",
    ],
    openGraph: {
      title: content.title,
      description: `${description}...`,
      type: "article",
      siteName: "AED III - IFSULDEMINAS",
    },
  };
}

export default async function ContentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  if (!content) {
    notFound();
  }

  const { previous, next } = getAdjacentContent(slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Conteúdo", href: "/content" },
            { label: content.title },
          ]}
        />

        {/* Single column layout - TOC in side panel */}
        <div className="max-w-5xl mx-auto">
          <ContentDetailClient
            content={content}
            previous={previous ? { slug: previous.slug, title: previous.title } : null}
            next={next ? { slug: next.slug, title: next.title } : null}
          />
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

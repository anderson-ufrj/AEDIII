import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContentDetailClient } from "@/components/content-detail-client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentNavigation } from "@/components/content-navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { ProgressTracker } from "@/components/progress-tracker";
import { getAllSlugs, getContentBySlug, getAdjacentContent } from "@/lib/content-loader";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Conteúdo", href: "/content" },
            { label: content.title },
          ]}
        />

        {/* Two column layout with TOC sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          <div className="min-w-0">
            <ProgressTracker contentSlug={content.slug} contentTitle={content.title} />
            <ContentDetailClient content={content} />
            <ContentNavigation
              previous={previous ? { slug: previous.slug, title: previous.title } : null}
              next={next ? { slug: next.slug, title: next.title } : null}
            />
          </div>

          {/* Table of Contents - Hidden on mobile */}
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

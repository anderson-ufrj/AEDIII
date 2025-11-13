import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContentDetailClient } from "@/components/content-detail-client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentNavigation } from "@/components/content-navigation";
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
        <ContentDetailClient content={content} />
        <ContentNavigation
          previous={previous ? { slug: previous.slug, title: previous.title } : null}
          next={next ? { slug: next.slug, title: next.title } : null}
        />
      </div>
      <Footer />
    </div>
  );
}

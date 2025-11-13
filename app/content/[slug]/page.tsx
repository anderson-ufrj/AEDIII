import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContentDetailClient } from "@/components/content-detail-client";
import { getAllSlugs, getContentBySlug } from "@/lib/content-loader";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />
      <ContentDetailClient content={content} />
      <Footer />
    </div>
  );
}

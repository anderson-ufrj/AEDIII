import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseProgress } from "@/components/course-progress";
import { FavoriteButton } from "@/components/favorite-button";
import { FavoritesList } from "@/components/favorites-list";
import { getAllContent, getContentByCategory, getAllSlugs } from "@/lib/content-loader";
import { COURSE_CATEGORIES } from "@/lib/types";
import { BookOpen, FileText, Star } from "lucide-react";
import { getCategoryTheme } from "@/lib/category-config";

// Helper function to extract plain text excerpt from markdown
function getExcerpt(markdown: string, maxLength: number = 120): string {
  // Remove markdown formatting and get plain text
  const plainText = markdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

export default function ContentPage() {
  const allContent = getAllContent();
  const allSlugs = getAllSlugs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      {/* Content Section */}
      <main id="main-content" className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Material Didático</h1>
            <p className="text-muted-foreground text-lg">
              Explore todo o conteúdo da disciplina organizado por categorias.
              {allContent.length} materiais disponíveis.
            </p>
          </div>

          {/* Course Progress Card */}
          <div className="mb-8">
            <CourseProgress totalContent={allContent.length} allSlugs={allSlugs} />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="favorites" className="gap-1">
                <Star className="h-3 w-3" />
                Favoritos
              </TabsTrigger>
              {COURSE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allContent.map((content) => {
                  const theme = getCategoryTheme(content.category);
                  const Icon = theme.icon;
                  const excerpt = getExcerpt(content.content);

                  return (
                    <Card
                      key={content.slug}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
                    >
                      <CardHeader className="flex-grow">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className={`p-2 rounded-lg ${theme.bgColor}`}>
                            <Icon className={`h-5 w-5 ${theme.color}`} />
                          </div>
                          <FavoriteButton
                            contentSlug={content.slug}
                            contentTitle={content.title}
                            variant="icon"
                          />
                        </div>
                        <CardTitle className="text-lg line-clamp-2">
                          {content.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {excerpt}
                        </CardDescription>
                        <div className="text-xs text-muted-foreground mt-2">
                          {content.pages > 0 && `${content.pages} páginas`}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full group" asChild>
                          <Link href={`/content/${content.slug}`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Ler Material
                            <span className="ml-auto group-hover:translate-x-1 transition-transform">→</span>
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <FavoritesList
                allContent={allContent.map((c) => ({ slug: c.slug, title: c.title }))}
              />
            </TabsContent>

            {COURSE_CATEGORIES.map((category) => {
              const categoryContent = getContentByCategory(category.id);
              const theme = getCategoryTheme(category.id);
              const Icon = theme.icon;

              return (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${theme.bgColor}`}>
                        <Icon className={`h-6 w-6 ${theme.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryContent.map((content) => {
                      const excerpt = getExcerpt(content.content);

                      return (
                        <Card
                          key={content.slug}
                          className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
                        >
                          <CardHeader className="flex-grow">
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className={`p-2 rounded-lg ${theme.bgColor}`}>
                                <Icon className={`h-5 w-5 ${theme.color}`} />
                              </div>
                              <FavoriteButton
                                contentSlug={content.slug}
                                contentTitle={content.title}
                                variant="icon"
                              />
                            </div>
                            <CardTitle className="text-lg line-clamp-2">
                              {content.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {excerpt}
                            </CardDescription>
                            <div className="text-xs text-muted-foreground mt-2">
                              {content.pages > 0 && `${content.pages} páginas`}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button variant="outline" className="w-full group" asChild>
                              <Link href={`/content/${content.slug}`}>
                                <BookOpen className="mr-2 h-4 w-4" />
                                Ler Material
                                <span className="ml-auto group-hover:translate-x-1 transition-transform">→</span>
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

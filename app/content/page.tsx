import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseProgress } from "@/components/course-progress";
import { getAllContent, getContentByCategory, getAllSlugs } from "@/lib/content-loader";
import { COURSE_CATEGORIES } from "@/lib/types";
import { BookOpen, FileText } from "lucide-react";

export default function ContentPage() {
  const allContent = getAllContent();
  const allSlugs = getAllSlugs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
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
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              {COURSE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allContent.map((content) => (
                  <Card key={content.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5" />
                        {content.title}
                      </CardTitle>
                      <CardDescription>
                        {content.pages > 0 && `${content.pages} páginas`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/content/${content.slug}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Ler Material
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {COURSE_CATEGORIES.map((category) => {
              const categoryContent = getContentByCategory(category.id);
              return (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryContent.map((content) => (
                      <Card key={content.slug} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5" />
                            {content.title}
                          </CardTitle>
                          <CardDescription>
                            {content.pages > 0 && `${content.pages} páginas`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/content/${content.slug}`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Ler Material
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}

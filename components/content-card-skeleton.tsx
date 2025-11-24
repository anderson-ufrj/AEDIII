import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <Card
      className="animate-fade-in flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-20 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export function ContentGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ContentCardSkeleton key={i} delay={i * 50} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="container mx-auto px-4 py-20 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <Skeleton className="h-14 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-6 w-full mb-2 mx-auto" />
        <Skeleton className="h-6 w-5/6 mb-8 mx-auto" />
        <div className="flex gap-4 justify-center flex-wrap">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </section>
  );
}

export function CategoryCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 border-l-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="relative">
        <Skeleton className="h-12 w-12 rounded-lg mb-3" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} delay={i * 75} />
      ))}
    </div>
  );
}

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Skeleton } from "./ui/Skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";

export default function NewReleasesSkeleton() {
  return (
    <section className="py-12 bg-gray-900" id="new-releases">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Button variant="link" className="text-gray-600 opacity-50 pointer-events-none">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array(10).fill(0).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 
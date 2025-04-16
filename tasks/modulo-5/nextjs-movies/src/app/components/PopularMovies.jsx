import { ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
export default function PopularMovies({ movies }) {

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Popular Movies</h2>
          <Button variant="link" className="text-red-600">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

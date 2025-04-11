import { ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import MovieCard from "./MovieCard";
import { useMovieStore } from "../store/moviesStore";
import { useEffect } from "react";

export default function NewReleases() {
  const { upcomingMovies = [], getUpcomingMovies } = useMovieStore((state) => state);
  useEffect(() => {
    getUpcomingMovies();
  }, [getUpcomingMovies]);

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Upcoming Movies</h2>
          <Button variant="link" className="text-red-600">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {upcomingMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

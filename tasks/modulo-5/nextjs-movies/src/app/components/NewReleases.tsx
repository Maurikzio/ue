import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Movie } from "@/types";
const { UPCOMING_MOVIES_URL, SECRET_TOKEN } = process.env;

export default async function NewReleases() {
  const newReleases = await fetch(`${UPCOMING_MOVIES_URL}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${SECRET_TOKEN}`
    }
  });
  const newReleasesData = await newReleases.json();
  const upcomingMovies = newReleasesData?.results?.slice(0, 5);

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
          {upcomingMovies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

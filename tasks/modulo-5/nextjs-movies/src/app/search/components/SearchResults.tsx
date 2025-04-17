import Image from "next/image";
import Link from "next/link";
import { Movie } from "../actions";

interface SearchResultsProps {
  movies: Movie[];
  isLoading?: boolean;
}

export default function SearchResults({ movies, isLoading = false }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center my-8 text-gray-400">
        No movies found. Try a different search term.
      </div>
    );
  }

  const getMovieImage = (poster_path: string) => {

    return poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://placehold.co/150x225";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {movies.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="group bg-gray-800 rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <div className="aspect-[2/3] relative">
            <Image
              src={getMovieImage(movie.poster_path)}
              alt={movie.title}
              className="object-cover"
              width={500}
              height={750}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold group-hover:text-red-500 transition">{movie.title}</h3>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm text-gray-300">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400 text-sm ml-auto">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 
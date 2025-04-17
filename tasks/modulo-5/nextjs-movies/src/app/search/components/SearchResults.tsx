import Image from "next/image";
import Link from "next/link";
import { Movie } from "../actions";
import { Star } from "lucide-react";

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
      ? `https://image.tmdb.org/t/p/w200${poster_path}`
      : "https://placehold.co/150x225";
  }

  return (
    <div className="space-y-4 my-8">
      {movies.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="flex bg-gray-800 rounded-lg overflow-hidden transform transition hover:bg-gray-700 border border-gray-700 hover:border-red-500"
        >
          <div className="h-32 w-20 flex-shrink-0 relative">
            <Image
              src={getMovieImage(movie.poster_path)}
              alt={movie.title}
              className="object-cover"
              fill
              sizes="80px"
              unoptimized={movie.poster_path ? false : true}
            />
          </div>

          <div className="p-4 flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-white group-hover:text-red-500 transition line-clamp-1">{movie.title}</h3>
              <div className="flex items-center ml-4 flex-shrink-0">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-300">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <div className="text-gray-400 text-sm mt-1">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </div>

            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {movie.overview || "No description available."}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
} 
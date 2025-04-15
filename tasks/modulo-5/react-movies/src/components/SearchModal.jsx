import { useState, useEffect, useRef } from "react";
import { Search, Film, Star } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import useDebounce from "../lib/useDebounce";
import { useMovieStore } from "../store/moviesStore";
import { Image } from "./ui/Image";
import { Link } from "react-router";

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);
  const { movieSearchResults, searchMovie, resetMovieSearchResults } = useMovieStore((state) => state);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);


  useEffect(() => {
    if (debouncedQuery) {
      searchMovie(debouncedQuery);
    }
  }, [debouncedQuery, searchMovie]);

  const handleOnClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
      resetMovieSearchResults();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} className="max-w-2xl">
      <div className="p-4 relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Buscar película..."
            className="pl-10 bg-gray-800 border-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 max-h-[60vh]">
        {query.trim() === "" ? (
          <div className="p-8 text-center text-gray-400">
            <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Ingresa el nombre de una pelicula</p>
          </div>
        ) : movieSearchResults?.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No encontramos resultados para: "{query}"</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {movieSearchResults?.map((movie) => (
              <li key={movie.id} className="p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <Link to={`/movies/${movie.id}`} className="flex items-start">
                  <div className="h-16 w-12 bg-gray-700 rounded mr-4 flex-shrink-0">
                    <Image
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://placehold.co/300x450"}
                      alt="Movie poster"
                      fill
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{movie.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">{movie.release_date?.split('-')?.[0] || " "}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500 ml-2">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>{movie.vote_average}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}

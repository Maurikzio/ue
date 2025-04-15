import { useState, useEffect, useRef } from "react";
import { Search, Film, Loader } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import useDebounce from "../lib/useDebounce";
import { useMovieStore } from "../store/moviesStore";
import MovieResultItem from "./MovieResultItem";

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);
  const {
    movieSearchResults,
    searchMovie,
    resetMovieSearchResults,
    isSearching
  } = useMovieStore((state) => state);

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
      setQuery("");
    }
  };

  const renderContent = () => {
    if (query.trim() === "") {
      return (
        <div className="p-8 text-center text-gray-400">
          <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter a movie title to search</p>
        </div>
      );
    }

    if (isSearching) {
      return (
        <div className="p-8 text-center text-gray-400">
          <Loader className="h-10 w-10 mx-auto mb-4 animate-spin" />
          <p>Searching for "{debouncedQuery}"...</p>
        </div>
      );
    }

    if (movieSearchResults?.length === 0) {
      return (
        <div className="p-8 text-center text-gray-400">
          <p>No results found for: "{debouncedQuery}"</p>
        </div>
      );
    }

    return (
      <ul className="divide-y divide-gray-800">
        {movieSearchResults?.map((movie) => (
          <MovieResultItem
            key={movie.id}
            movie={movie}
            onClose={handleOnClose}
          />
        ))}
      </ul>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} className="max-w-2xl">
      <div className="p-4 relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for a movie..."
            className="pl-10 bg-gray-800 border-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 max-h-[60vh]">
        {renderContent()}
      </div>
    </Modal>
  );
}

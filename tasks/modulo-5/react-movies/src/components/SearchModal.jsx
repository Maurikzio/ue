import { useState, useEffect, useRef } from "react";
import { Search, Film, Star } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";

// Mock data for search results
const mockMovies = [
  { id: 1, title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi" },
  { id: 2, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama" },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
  { id: 4, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { id: 5, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime" },
  { id: 6, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi" },
  { id: 7, title: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama" },
  { id: 8, title: "Fight Club", year: 1999, rating: 8.8, genre: "Drama" },
];

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Filter movies based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filteredMovies = mockMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredMovies);
  }, [query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
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
            <p>Start typing to search for movies</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No results found for "{query}"</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {results.map((movie) => (
              <li key={movie.id} className="p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start">
                  <div className="h-16 w-12 bg-gray-700 rounded mr-4 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{movie.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">{movie.year}</span>
                      <span className="mr-2">•</span>
                      <span>{movie.genre}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500 ml-2">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}

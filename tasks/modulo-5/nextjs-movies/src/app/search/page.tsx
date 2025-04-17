'use client'
import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchMovies } from "./actions";
import { Movie } from "./actions";
import SearchResults from "./components/SearchResults";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchTerm(query);
    startTransition(async () => {
      const searchResults = await searchMovies(query);
      setResults(searchResults);
    });
  };

  useEffect(() => {
    if (query === "") {
      setResults([]);
      setSearchTerm("");
    }
  }, [query]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-red-900">
      <div className="container mx-auto flex flex-col items-center pt-30">
        <div className="max-w-3xl w-full p-4">
          <form onSubmit={handleSearch} className="relative flex">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white h-10"
                type="search"
              />
            </div>
            <Button
              type="submit"
              className="ml-2 bg-red-700 hover:bg-red-800 text-white"
              disabled={isPending || !query.trim()}
            >
              Search
            </Button>
          </form>

          {searchTerm && (
            <div className="mt-4 text-white">
              <h2 className="text-xl font-semibold mb-2">
                {isPending ? "Searching..." : `Results for "${searchTerm}"`}
              </h2>
              <SearchResults movies={results} isLoading={isPending} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
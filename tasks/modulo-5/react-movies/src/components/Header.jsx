import { Link } from "react-router";
import { Search } from "lucide-react";
import { Input } from "./ui/Input";

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-600">
          MovieFlix
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-red-600 transition-colors">
            Movies
          </Link>
          <Link href="#" className="hover:text-red-600 transition-colors">
            TV Shows
          </Link>
          <Link href="#" className="hover:text-red-600 transition-colors">
            New & Popular
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar pelicula"
              className="pl-8 bg-gray-900 border-gray-700 text-white focus:ring-red-600 focus:border-red-600 w-64"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

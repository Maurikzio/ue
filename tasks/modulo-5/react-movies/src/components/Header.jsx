import { Link } from "react-router";
import { Search } from "lucide-react";
import { Button } from "./ui/Button";

export default function Header({ setIsSearchModalOpen }) {

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-600">
          MovieFlix
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="#" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link to="#" className="hover:text-red-600 transition-colors">
            Movies
          </Link>
          <Link to="#" className="hover:text-red-600 transition-colors">
            TV Shows
          </Link>
          <Link to="#" className="hover:text-red-600 transition-colors">
            New & Popular
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="flex items-center border-gray-700 hover:bg-gray-800"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="md:hidden border-gray-700 hover:bg-gray-800 p-2 h-9 w-9"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

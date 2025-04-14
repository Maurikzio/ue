import { useState } from "react";
import { SearchModal } from "../components/SearchModal";
import { Input } from "../components/ui/Input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router";


export default function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen flex justify-center items-start pt-30 relative">
      <div className="absolute top-0 left-0 p-4">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="h-5 w-5" />
          Inicio
        </Link>
      </div>
      <div className="max-w-md w-full p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar película..."
            onClick={() => setIsOpen(true)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
        {isOpen ? <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> : null}
      </div>
    </div>
  );
}

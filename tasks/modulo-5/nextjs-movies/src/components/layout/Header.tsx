import Link from "next/link";

// interface HeaderProps {
//   setIsSearchModalOpen: (isOpen: boolean) => void;
// }

// export default function Header({ setIsSearchModalOpen }: HeaderProps) {
export default function Header() {
  return (
    <>
      <header className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            MovieFlix
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-white">
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
          <div>
            <Link href="/search" className="hover:text-red-600 transition-colors">Search</Link>
          </div>
        </div>
      </header>
    </>
  );
}

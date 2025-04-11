import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MovieFlix</h3>
            <p className="text-gray-400">The best movie streaming platform for all your entertainment needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-red-600">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  New & Popular
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  My List
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-red-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-red-600">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MovieFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

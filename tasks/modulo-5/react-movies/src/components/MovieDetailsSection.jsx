import { MessageSquare, Star } from "lucide-react";
import { Image } from "./ui/Image";

export default function MovieDetailsSection({
  overview,
  cast,
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed">{overview}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cast?.map((person) => (
                <div key={person.name} className="text-center">
                  <div className="aspect-[2/3] mb-2 overflow-hidden rounded-lg">
                    <Image
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : "https://placehold.co/150x225"}
                      fill
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-medium">{person.name}</div>
                  <div className="text-sm text-gray-400">{person.character}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

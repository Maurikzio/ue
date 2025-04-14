import { MessageSquare, Star } from "lucide-react";
import { Image } from "./ui/Image";

export default function MovieDetailsSection({
  overview,
  cast,
  reviews
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

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-gray-700 hover:bg-gray-800 text-white h-10 px-4 py-2">
                <MessageSquare className="mr-2 h-4 w-4" /> Write a Review
              </button>
            </div>

            {reviews.map((review, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.user}</div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                    <span>{review.rating}/10</span>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        {/* <div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
          <div className="space-y-4">
            {movie.similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <img
                  src="https://placehold.co/60x90"
                  alt={similarMovie.title}
                  className="w-[60px] h-[90px] rounded object-cover"
                />
                <div>
                  <div className="font-medium">{similarMovie.title}</div>
                  <div className="text-sm text-gray-400">{similarMovie.year}</div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                    <span>{similarMovie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

import { Star } from "lucide-react";
import { Image } from "./ui/Image";
import { Link } from "react-router";

export default function MovieResultItem({ movie, onClose }) {
  const { id, title, poster_path, release_date, vote_average } = movie;

  const imgSrc = poster_path
  ? `https://image.tmdb.org/t/p/w300${poster_path}`
  : "https://placehold.co/300x450";

  return (
    <li className="p-4 hover:bg-gray-800 transition-colors cursor-pointer">
      <Link to={`/movies/${id}`} className="flex items-start" onClick={onClose}>
        <div className="h-16 w-12 bg-gray-700 rounded mr-4 flex-shrink-0">
          <Image
            src={imgSrc}
            alt="Movie poster"
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">{release_date?.split('-')?.[0] || " "}</span>
          </div>
        </div>
        <div className="flex items-center text-yellow-500 ml-2">
          <Star className="h-4 w-4 mr-1 fill-current" />
          <span>{vote_average}</span>
        </div>
      </Link>
    </li>
  )
}
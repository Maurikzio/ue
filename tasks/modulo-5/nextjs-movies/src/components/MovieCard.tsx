import { Play, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: {
    poster_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    id: number;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const {
    poster_path,
    original_title,
    release_date,
    vote_average = 0,
    id,
  } = movie;

  const releaseYear = release_date?.split('-')?.[0] || " ";
  const imgSrc = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://placehold.co/300x450";


  return (
    <div className="group cursor-pointer">
      <Link href={`/movies/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-2">
          <Image
            src={imgSrc}
            alt="Movie poster"
            width={300}
            height={450}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <Button size="sm" className=" text-white bg-red-600 hover:bg-red-700">
              <Play className="h-4 w-4 mr-1" /> Watch
            </Button>
          </div>
        </div>
        <h3 className="font-medium truncate">{original_title}</h3>
        <div className="flex items-center text-sm text-gray-400">
          <Star className="h-3 w-3 text-yellow-500 mr-1" />
          <span>{vote_average}</span>
          <span className="mx-2">•</span>
          <span>{releaseYear}</span>
        </div>
      </Link>
    </div>
  );
}

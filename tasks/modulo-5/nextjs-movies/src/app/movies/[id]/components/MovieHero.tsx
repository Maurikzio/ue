import { Calendar, Clock, Heart, Play, Plus, Share2, Star } from "lucide-react";
import Image from "next/image";

interface MovieHeroProps {
  title: string;
  tagline: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  runtime: number;
  release_date: string;
  director: string;
}

export default function MovieHero({
  title,
  tagline,
  vote_average,
  poster_path,
  backdrop_path,
  genres,
  runtime,
  release_date,
  director
}: MovieHeroProps) {

  const backdropUrl = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : "https://placehold.co/1920x1080";
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://placehold.co/500x750";
  return (
    <div className="relative" >
      <div className="relative h-[70vh] w-full">
        <Image
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover brightness-50"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row gap-8">
          <div className="w-[250px] h-[375px] hidden md:block">
            <Image
              src={posterUrl}
              alt={title}
              className=" rounded-lg shadow-lg object-cover"
              width={500}
              height={750}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-600 text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
            <p className="text-gray-400 text-lg italic mb-4">{tagline}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span>{vote_average}/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>{runtime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                <span>{release_date}</span>
              </div>
              <div className="text-gray-400">
                Director: <span className="text-white">{director}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2">
                <Play className="mr-2 h-4 w-4" /> Watch Now
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white h-10 px-4 py-2">
                <Plus className="mr-2 h-4 w-4" /> Add to List
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white h-10 px-4 py-2">
                <Heart className="mr-2 h-4 w-4" /> Favorite
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white h-10 px-4 py-2">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
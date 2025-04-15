import { Play, Star } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Image } from "./ui/Image";
import { Button } from "./ui/Button";
import { Link } from "react-router";


export default function MainHero({ movie }) {
  const {
    backdrop_path,
    original_title,
    overview,
    release_date,
    vote_average = 0,
    id,
  } = movie;

  const releaseYear = release_date?.split('-')?.[0] || " ";
  const imgSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "https://placehold.co/1920x1080";

  return (
    <section className="relative">
      <div className="relative h-[70vh] w-full">
        <Image
          src={imgSrc}
          alt="Featured Movie"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Badge className="mb-4 bg-red-600 hover:bg-red-600">Featured</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{original_title}</h1>
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="mr-4">{`${vote_average}/10`}</span>
            <span className="mr-4">{releaseYear}</span>
          </div>
          <p className="text-gray-300 max-w-2xl mb-6">{overview}</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Play className="mr-2 h-4 w-4" /> Watch Now
            </Button>
            <Link to={`/movies/${id}`} className=" inline-flex items-center justify-center rounded-md border-white text-white hover:bg-white/10 px-2">
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

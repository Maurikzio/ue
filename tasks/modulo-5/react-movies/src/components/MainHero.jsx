import { Play, Star } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Image } from "./ui/Image";
import { Button } from "./ui/Button";

export default function MainHero() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] w-full">
        <Image
          // src="/placeholder.svg?height=1080&width=1920"
          src="https://lumiere-a.akamaihd.net/v1/images/image_ecad3976.jpeg?region=0%2C0%2C1415%2C1411"
          alt="Featured Movie"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Badge className="mb-4 bg-red-600 hover:bg-red-600">Featured</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Interstellar</h1>
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="mr-4">8.6/10</span>
            <span className="mr-4">2014</span>
            <span>169 min</span>
          </div>
          <p className="text-gray-300 max-w-2xl mb-6">
            A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Play className="mr-2 h-4 w-4" /> Watch Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              More Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

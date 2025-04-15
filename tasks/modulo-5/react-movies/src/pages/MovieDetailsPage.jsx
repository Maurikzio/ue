import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useMovieStore } from "../store/moviesStore";
import MovieHero from "../components/MovieHero";
import MovieDetailsSection from "../components/MovieDetailsSection";
import { SearchModal } from "../components/SearchModal";

export default function MovieDetailsPage() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { movieDetails, fetchMovieDetails } = useMovieStore((state) => state);
  const params = useParams();

  useEffect(() => {
    const movieId = params?.['movie-id'];
    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [params, fetchMovieDetails]);

  const {
    title,
    tagline,
    vote_average,
    poster_path,
    backdrop_path,
    genres = [],
    runtime,
    release_date,
    overview,
    credits = {}
  } = movieDetails;

  const { crew = [], cast = [] } = credits;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header setIsSearchModalOpen={setIsSearchModalOpen} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <MovieHero
        title={title}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        genres={genres}
        tagline={tagline}
        vote_average={vote_average}
        runtime={runtime}
        release_date={release_date}
        director={crew?.find(item => item.job === 'Director')?.name}
      />
      <MovieDetailsSection
        overview={overview}
        cast={cast.slice(0, 4)}
        reviews={[]}
      />
    </div>
  );
}

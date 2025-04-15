import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useMovieStore } from "../store/moviesStore";
import MovieHero from "../components/MovieHero";
import MovieDetailsSection from "../components/MovieDetailsSection";
import { SearchModal } from "../components/SearchModal";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import ErrorDisplay from "../components/ErrorDisplay";

export default function MovieDetailsPage() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const {
    movieDetails,
    fetchMovieDetails,
    isLoadingMovieDetails,
    movieDetailsError
  } = useMovieStore((state) => state);
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

  const renderContent = () => {
    if (isLoadingMovieDetails) {
      return <MovieDetailsSkeleton />;
    }

    if (movieDetailsError) {
      return (
        <ErrorDisplay 
          title="Movie Not Found"
          message={movieDetailsError}
          actionText="Browse Movies"
          actionLink="/"
        />
      );
    }

    if (!title) {
      return (
        <ErrorDisplay 
          title="No Details Available"
          message="We couldn't find details for this movie. Please try searching for another movie."
          actionText="Back to Home"
          actionLink="/"
        />
      );
    }

    return (
      <>
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
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header setIsSearchModalOpen={setIsSearchModalOpen} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      {renderContent()}
    </div>
  );
}

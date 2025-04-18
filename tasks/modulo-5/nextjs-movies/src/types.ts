interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

interface Crew {
  job: string;
  name: string;
}

interface MovieDetailsSectionProps {
  overview: string;
  cast: Cast[]
}

interface Movie {
  title: string;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  id: number;
}

interface MainHeroProps {
  movie: Movie;
}

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

interface SearchResultsProps {
  movies: Movie[];
  isLoading?: boolean;
}

export type {
  Cast,
  Crew,
  MovieDetailsSectionProps,
  Movie,
  MainHeroProps,
  MovieHeroProps,
  SearchResultsProps
};
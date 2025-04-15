import { create } from "zustand";

const {
  VITE_SECRET_TOKEN,
  VITE_POPULAR_MOVIES_URL,
  VITE_UPCOMING_MOVIES_URL,
  VITE_SEARCH_MOVIE_URL,
  VITE_MOVIE_DETAILS_URL
} = import.meta.env;

export const useMovieStore = create((set, get) => ({
  popularMovies: [{}],
  upcomingMovies: [],
  currentMovie: null,
  movieSearchResults: [],
  movieDetails: {},
  isLoadingMovieDetails: false,
  movieDetailsError: null,
  resetMovieSearchResults: () => {
    set({ movieSearchResults: [] });
  },
  getPopularMovies: async () => {
    try {
      const url = VITE_POPULAR_MOVIES_URL;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: import.meta.env.VITE_SECRET_TOKEN
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      set({ popularMovies: data?.results.slice(0, 10) });
    } catch (error) {
      console.error("Error-> ", error);
    }
  },
  getUpcomingMovies: async () => {
    try {
      const url = VITE_UPCOMING_MOVIES_URL;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: VITE_SECRET_TOKEN
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      set({ upcomingMovies: data?.results.slice(0, 5) });

    } catch (error) {
      console.error("Error->", error);
    }
  },
  searchMovie: async (movieName = '') => {
    try {
      const url = `${VITE_SEARCH_MOVIE_URL}${movieName}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: VITE_SECRET_TOKEN
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      set({ movieSearchResults: data?.results });
    } catch (error) {
      console.error("Error ->", error);
    }
  },
  fetchMovieDetails: async (movieId = '') => {
    try {
      // Reset state before fetching
      set({
        isLoadingMovieDetails: true,
        movieDetailsError: null,
        movieDetails: {}
      });

      // Validate the movie ID is a number
      if (isNaN(Number(movieId))) {
        throw new Error('Invalid movie ID. ID must be a number.');
      }

      const url = `${VITE_MOVIE_DETAILS_URL}${movieId}?append_to_response=credits`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: VITE_SECRET_TOKEN
        }
      };

      const response = await fetch(url, options);

      // Handle API errors (like 404)
      if (!response.ok) {
        throw new Error(`Error fetching movie: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Check if the API returned an error in the response body
      if (data.success === false) {
        throw new Error(data.status_message || 'Failed to fetch movie details');
      }

      set({
        movieDetails: data,
        isLoadingMovieDetails: false
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      set({
        movieDetailsError: error.message,
        isLoadingMovieDetails: false
      });
    }
  }
}));

import { create } from "zustand";

const { VITE_SECRET_TOKEN, VITE_POPULAR_MOVIES_URL, VITE_UPCOMING_MOVIES_URL } = import.meta.env;

export const useMovieStore = create((set, get) => ({
  popularMovies: [{}],
  upcomingMovies: [],
  currentMovie: null,
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
  }

}));

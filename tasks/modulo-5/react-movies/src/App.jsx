// import { useState } from 'react';
// import viteLogo from '/vite.svg';
// import './App.css';
import { useState, useEffect, lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainHero from "./components/MainHero";
import PopularMoviesSkeleton from "./components/PopularMoviesSkeleton";
import NewReleasesSkeleton from "./components/NewReleasesSkeleton";

// Lazy load these components
const NewReleases = lazy(() => import("./components/NewReleases"));
const PopularMovies = lazy(() => import("./components/PopularMovies"));
import { useMovieStore } from "./store/moviesStore";
import { SearchModal } from "./components/SearchModal";


function App() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { popularMovies = [], getPopularMovies } = useMovieStore((state) => state);
  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  const [popularMovie, ...rest] = popularMovies;
  return (
    <div className="min-h-screen text-white">
      <Header setIsSearchModalOpen={setIsSearchModalOpen} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <MainHero movie={popularMovie} />

      <Suspense fallback={<PopularMoviesSkeleton />}>
        <PopularMovies movies={rest} />
      </Suspense>

      <Suspense fallback={<NewReleasesSkeleton />}>
        <NewReleases />
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;

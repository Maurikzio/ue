// import { useState } from 'react';
// import viteLogo from '/vite.svg';
// import './App.css';
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainHero from "./components/MainHero";
import NewReleases from "./components/NewReleases";
import PopularMovies from "./components/PopularMovies";
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
      <PopularMovies movies={rest} />
      <NewReleases />
      <Footer />
    </div>
  );
}

export default App;

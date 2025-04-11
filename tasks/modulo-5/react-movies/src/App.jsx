// import { useState } from 'react';
// import viteLogo from '/vite.svg';
// import './App.css';
import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainHero from "./components/MainHero";
import NewReleases from "./components/NewReleases";
import PopularMovies from "./components/PopularMovies";
import { useMovieStore } from "./store/moviesStore";


function App() {
  const { popularMovies = [], getPopularMovies } = useMovieStore((state) => state);
  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  const [popularMovie, ...rest] = popularMovies;
  return (
    <div className="min-h-screen text-white">
      <Header />
      <MainHero movie={popularMovie} />
      <PopularMovies movies={rest} />
      <NewReleases />
      <Footer />
    </div>
  );
}

export default App;

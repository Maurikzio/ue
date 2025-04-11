// import { useState } from 'react';
// import viteLogo from '/vite.svg';
// import './App.css';

import Footer from "./components/Footer";
import Header from "./components/Header";
import MainHero from "./components/MainHero";
import NewReleases from "./components/NewReleases";
import PopularMovies from "./components/PopularMovies";

function App() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <MainHero />
      <PopularMovies />
      <NewReleases />
      <Footer />
    </div>
  );
}

export default App;

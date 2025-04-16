import MainHero from "./components/MainHero";
import NewReleases from "./components/NewReleases";
import PopularMovies from "./components/PopularMovies";
const { POPULAR_MOVIES_URL, SECRET_TOKEN } = process.env;

export default async function Home() {
  const popularMovies = await fetch(`${POPULAR_MOVIES_URL}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${SECRET_TOKEN}`
    }
  });
  const popularMoviesData = await popularMovies.json();
  const data = popularMoviesData?.results?.slice(0, 10);
  const [popularMovie, ...rest] = data;

  return (
    <div className="min-h-screen">
      <MainHero movie={popularMovie} />
      <PopularMovies movies={rest} />
      <NewReleases />
    </div>
  );
}

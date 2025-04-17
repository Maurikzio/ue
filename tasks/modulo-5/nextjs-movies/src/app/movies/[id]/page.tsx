import MovieDetails from "./components/MovieDetails";
import MovieHero from "./components/MovieHero";
const { MOVIE_DETAILS_URL, SECRET_TOKEN } = process.env;

interface Crew {
  job: string;
  name: string;
}

export default async function MoviewPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const moviewDetails = await fetch(`${MOVIE_DETAILS_URL}${id}?append_to_response=credits`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${SECRET_TOKEN}`
    }
  })
  const moviewDetailsData = await moviewDetails.json();


  return (
    <div className="min-h-screen bg-black text-white">
      <MovieHero
        title={moviewDetailsData.title}
        tagline={moviewDetailsData.tagline}
        vote_average={moviewDetailsData.vote_average}
        poster_path={moviewDetailsData.poster_path}
        backdrop_path={moviewDetailsData.backdrop_path}
        genres={moviewDetailsData.genres}
        runtime={moviewDetailsData.runtime}
        release_date={moviewDetailsData.release_date}
        director={moviewDetailsData.credits.crew.find((item: Crew) => item.job === 'Director')?.name}
      />
      <MovieDetails
        overview={moviewDetailsData.overview}
        cast={moviewDetailsData.credits.cast.slice(0, 4)}
      />
    </div>
  )
}
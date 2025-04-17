'use server';

import { revalidatePath } from 'next/cache';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const { SEARCH_MOVIE_URL, SECRET_TOKEN } = process.env;

  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const response = await fetch(`${SEARCH_MOVIE_URL}${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${SECRET_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`Search API responded with status: ${response.status}`);
    }

    const data = await response.json();
    revalidatePath('/search');

    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date
    }));
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
} 
import { useState, useEffect } from 'react';
import { Movie, SearchResponse } from '../types';

const OMDB_API_KEY = '876a43b7';

// Popular movie titles to fetch for homepage
const POPULAR_MOVIE_TITLES = [
  'The Dark Knight',
  'Inception',
  'Interstellar',
  'The Matrix',
  'Pulp Fiction',
  'The Shawshank Redemption',
  'Forrest Gump',
  'The Godfather',
  'Avengers Endgame',
  'Spider-Man No Way Home',
  'Dune',
  'Top Gun Maverick',
  'Black Panther',
  'Joker'
];

export const usePopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch multiple popular movies
        const moviePromises = POPULAR_MOVIE_TITLES.slice(0, 14).map(async (title) => {
          try {
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=movie`
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch movie');
            }

            const data = await response.json();
            
            if (data.Response === 'True') {
              return data;
            }
            return null;
          } catch (err) {
            console.error(`Error fetching ${title}:`, err);
            return null;
          }
        });

        const results = await Promise.all(moviePromises);
        const validMovies = results.filter((movie): movie is Movie => movie !== null);
        
        setPopularMovies(validMovies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPopularMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return { popularMovies, loading, error };
};
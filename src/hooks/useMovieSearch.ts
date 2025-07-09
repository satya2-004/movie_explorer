import { useState, useEffect } from 'react';
import { Movie, SearchResponse } from '../types';
import { useDebounce } from './useDebounce';

const OMDB_API_KEY = '876a43b7';

export const useMovieSearch = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Send all data requests to OMDb API with API key
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(debouncedQuery)}&type=movie&page=1`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data: SearchResponse = await response.json();
        
        if (data.Response === 'True' && data.Search) {
          // Limit to 10 results as per requirements
          setMovies(data.Search.slice(0, 10));
        } else {
          setMovies([]);
          setError(data.Error || 'No movies found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  return { movies, loading, error };
};
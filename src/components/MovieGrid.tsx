import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onShowDetails?: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, error, onShowDetails }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-600 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No movies found. Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
};
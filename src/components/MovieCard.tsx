import React from 'react';
import { Plus, Check, Calendar, Info } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onShowDetails?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onShowDetails }) => {
  const { user, updateWatchlist } = useAuth();
  
  const isInWatchlist = user?.watchlist.some(m => m.imdbID === movie.imdbID) || false;

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      updateWatchlist(movie, 'remove');
    } else {
      updateWatchlist(movie, 'add');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}
          alt={movie.Title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/300/450';
          }}
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full transition-colors ${
              isInWatchlist
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600'
            }`}
          >
            {isInWatchlist ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{movie.Year}</span>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
            {movie.Type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onShowDetails?.(movie)}
            className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
          >
            <Info className="h-4 w-4" />
            <span>Details</span>
          </button>
          
          <button
            onClick={handleWatchlistToggle}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isInWatchlist
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
            }`}
          >
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};
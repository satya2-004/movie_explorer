import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Calendar, User, Film, Plus, Check } from 'lucide-react';
import { Movie, MovieDetailResponse } from '../types';
import { useAuth } from '../contexts/AuthContext';

const OMDB_API_KEY = '876a43b7';

interface MovieDetailsDrawerProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetailsDrawer: React.FC<MovieDetailsDrawerProps> = ({ movie, isOpen, onClose }) => {
  const { user, updateWatchlist } = useAuth();
  const [movieDetails, setMovieDetails] = useState<MovieDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const isInWatchlist = user?.watchlist.some(m => m.imdbID === movie.imdbID) || false;

  useEffect(() => {
    if (isOpen && movie.imdbID) {
      fetchMovieDetails();
    }
  }, [isOpen, movie.imdbID]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      // Send all data requests to OMDb API for detailed movie information with API key
      const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}&plot=full`);
      const data: MovieDetailResponse = await response.json();
      
      if (data.Response === 'True') {
        setMovieDetails(data);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = () => {
    const movieToAdd = movieDetails || movie;
    if (isInWatchlist) {
      updateWatchlist(movieToAdd, 'remove');
    } else {
      updateWatchlist(movieToAdd, 'add');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Movie Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Movie Poster and Basic Info */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}
                      alt={movie.Title}
                      className="w-full sm:w-48 h-auto rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/300/450';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {movie.Title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{movie.Year}</span>
                      </div>
                      
                      {movieDetails?.Runtime && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{movieDetails.Runtime}</span>
                        </div>
                      )}
                      
                      {movieDetails?.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{movieDetails.imdbRating}/10</span>
                        </div>
                      )}
                    </div>

                    {movieDetails?.Genre && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {movieDetails.Genre.split(', ').map((genre, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={handleWatchlistToggle}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                        isInWatchlist
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isInWatchlist ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>In Watchlist</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Add to Watchlist</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Plot */}
                {movieDetails?.Plot && movieDetails.Plot !== 'N/A' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Plot
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {movieDetails.Plot}
                    </p>
                  </div>
                )}

                {/* Cast and Crew */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {movieDetails?.Director && movieDetails.Director !== 'N/A' && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Film className="h-4 w-4 mr-2" />
                        Director
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {movieDetails.Director}
                      </p>
                    </div>
                  )}

                  {movieDetails?.Actors && movieDetails.Actors !== 'N/A' && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Cast
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {movieDetails.Actors}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types';
import { TrendingUp, Star, Calendar, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface HomeMoviesProps {
  movies: Movie[];
  loading: boolean;
  onShowDetails?: (movie: Movie) => void;
}

export const HomeMovies: React.FC<HomeMoviesProps> = ({ movies, loading, onShowDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(movies.length, 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(movies.length, 5)) % Math.min(movies.length, 5));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Hero Section Skeleton */}
        <div className="relative h-96 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
          <div className="absolute bottom-8 left-8 space-y-4">
            <div className="h-8 bg-gray-400 dark:bg-gray-500 rounded w-64"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-48"></div>
            <div className="h-10 bg-gray-400 dark:bg-gray-500 rounded w-32"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-600 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Unable to load popular movies at the moment.
        </p>
      </div>
    );
  }

  const featuredMovies = movies.slice(0, 5); // Show first 5 movies in slider
  const otherMovies = movies.slice(5);
  const currentMovie = featuredMovies[currentSlide];

  return (
    <div className="space-y-8">
      {/* Featured Movies Slider */}
      {featuredMovies.length > 0 && (
        <div className="relative h-96 rounded-xl overflow-hidden group">
          {/* Movie Slides */}
          <div className="relative h-full">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.imdbID}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/800/400'}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/800/400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Auto-play Control */}
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            {isAutoPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Movie Info Overlay */}
          {currentMovie && (
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Featured Movie</span>
                <span className="text-white/60 text-sm">
                  {currentSlide + 1} of {featuredMovies.length}
                </span>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-3 leading-tight">
                {currentMovie.Title}
              </h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-white/80">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{currentMovie.Year}</span>
                </div>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                  {currentMovie.Type}
                </span>
              </div>

              <button
                onClick={() => onShowDetails?.(currentMovie)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Details
              </button>
            </div>
          )}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white scale-110'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentSlide + 1) / featuredMovies.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Popular Movies Section */}
      {otherMovies.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              More Trending Movies
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Movie Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎬 Movie Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Action & Adventure</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try searching: "Marvel", "Mission Impossible", "Fast Furious"
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Classic Movies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try searching: "Godfather", "Casablanca", "Citizen Kane"
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recent Hits</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try searching: "Dune", "Spider-Man", "Top Gun Maverick"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
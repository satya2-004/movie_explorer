import React, { useState } from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './MovieGrid';
import { HomeMovies } from './HomeMovies';
import { Watchlist } from './Watchlist';
import { MovieDetailsDrawer } from './MovieDetailsDrawer';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { Movie } from '../types';

export const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const { movies, loading, error } = useMovieSearch(searchQuery);
  const { popularMovies, loading: popularLoading } = usePopularMovies();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowWatchlist(false);
    setShowHome(!query.trim());
    if (query.trim()) {
      setShowSearchBar(true);
    }
  };

  const handleShowDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleShowHome = () => {
    setShowHome(true);
    setShowWatchlist(false);
    setSearchQuery('');
    setShowSearchBar(false);
  };

  const handleShowWatchlist = () => {
    setShowWatchlist(true);
    setShowHome(false);
    setShowSearchBar(false);
  };

  const handleShowSearch = () => {
    setShowSearchBar(true);
    setShowWatchlist(false);
    setShowHome(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onShowSearch={handleShowSearch}
        onShowWatchlist={handleShowWatchlist}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSearchBar && (
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {showWatchlist ? 'Your Watchlist' : (showHome && !showSearchBar) ? 'Popular Movies' : showSearchBar && !searchQuery ? 'Search Movies' : 'Search Results'}
            </h2>
            <div className="flex space-x-3">
              {(!showHome || showSearchBar) && (
                <button
                  onClick={handleShowHome}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Home
                </button>
              )}
              {!showWatchlist && (
                <button
                  onClick={handleShowWatchlist}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  View Watchlist
                </button>
              )}
            </div>
          </div>
        </div>

        {showWatchlist ? (
          <Watchlist onShowDetails={handleShowDetails} />
        ) : (showHome && !showSearchBar) ? (
          <HomeMovies 
            movies={popularMovies} 
            loading={popularLoading} 
            onShowDetails={handleShowDetails} 
          />
        ) : showSearchBar && !searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Start typing in the search bar above to find your favorite movies...
            </p>
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            loading={loading}
            error={error}
            onShowDetails={handleShowDetails}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieDetailsDrawer
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};
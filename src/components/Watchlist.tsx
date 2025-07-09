import React from 'react';
import { Trash2, Eye, Calendar, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Movie } from '../types';

interface WatchlistProps {
  onShowDetails?: (movie: Movie) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({ onShowDetails }) => {
  const { user, updateWatchlist, clearWatchlist } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  if (!user?.watchlist.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your Watchlist
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No movies in your watchlist yet. Start searching and add some movies!
        </p>
      </div>
    );
  }

  const handleDeleteAll = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAll = () => {
    clearWatchlist();
    setShowDeleteConfirm(false);
  };

  const cancelDeleteAll = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Watchlist ({user.watchlist.length})
          </h2>
          
          <button
            onClick={handleDeleteAll}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete All</span>
          </button>
        </div>
      
        <div className="space-y-4">
          {user.watchlist.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/60/90'}
                alt={movie.Title}
                className="w-12 h-18 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/60/90';
                }}
              />
            
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {movie.Title}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{movie.Year}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onShowDetails?.(movie)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
              
                <button
                  onClick={() => updateWatchlist(movie, 'remove')}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete All Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={cancelDeleteAll} />
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete All Movies
                  </h3>
                </div>
                <button
                  onClick={cancelDeleteAll}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Are you sure you want to delete all movies from your watchlist?
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                    ⚠️ This action cannot be undone
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    You will lose all {user.watchlist.length} movies from your watchlist permanently.
                  </p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={cancelDeleteAll}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors font-medium"
                >
                  No, Cancel
                </button>
                <button
                  onClick={confirmDeleteAll}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Movie } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('movie-explorer-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would be an actual API request
    const users = JSON.parse(localStorage.getItem('movie-explorer-users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        watchlist: foundUser.watchlist || []
      };
      setUser(userSession);
      localStorage.setItem('movie-explorer-user', JSON.stringify(userSession));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would be an actual API request
    const users = JSON.parse(localStorage.getItem('movie-explorer-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
      watchlist: []
    };

    users.push(newUser);
    localStorage.setItem('movie-explorer-users', JSON.stringify(users));

    const userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      watchlist: newUser.watchlist
    };
    setUser(userSession);
    localStorage.setItem('movie-explorer-user', JSON.stringify(userSession));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movie-explorer-user');
  };

  const updateWatchlist = (movie: Movie, action: 'add' | 'remove') => {
    if (!user) return;

    let newWatchlist;
    if (action === 'add') {
      // Prevent duplicates
      const isAlreadyInWatchlist = user.watchlist.some(m => m.imdbID === movie.imdbID);
      if (isAlreadyInWatchlist) return;
      newWatchlist = [...user.watchlist, movie];
    } else {
      newWatchlist = user.watchlist.filter(m => m.imdbID !== movie.imdbID);
    }

    const updatedUser = { ...user, watchlist: newWatchlist };
    setUser(updatedUser);
    localStorage.setItem('movie-explorer-user', JSON.stringify(updatedUser));

    // Update stored users array
    const users = JSON.parse(localStorage.getItem('movie-explorer-users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].watchlist = newWatchlist;
      localStorage.setItem('movie-explorer-users', JSON.stringify(users));
    }
  };

  const clearWatchlist = () => {
    if (!user) return;

    const updatedUser = { ...user, watchlist: [] };
    setUser(updatedUser);
    localStorage.setItem('movie-explorer-user', JSON.stringify(updatedUser));

    // Update stored users array
    const users = JSON.parse(localStorage.getItem('movie-explorer-users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].watchlist = [];
      localStorage.setItem('movie-explorer-users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateWatchlist,
      clearWatchlist
    }}>
      {children}
    </AuthContext.Provider>
  );
};
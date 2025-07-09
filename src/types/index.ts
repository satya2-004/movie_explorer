export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  imdbRating?: string;
  Runtime?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  watchlist: Movie[];
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailResponse extends Movie {
  Response: string;
  Error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateWatchlist: (movie: Movie, action: 'add' | 'remove') => void;
  clearWatchlist: () => void;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
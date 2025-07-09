# Movie Explorer

A beautiful, production-ready movie search and watchlist application built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration with password validation
- **Movie Search**: Search movies using the OMDb API with debounced input
- **Watchlist Management**: Add/remove movies to your personal watchlist
- **Movie Details**: View detailed information about movies in a slide-out drawer
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Mobile-first design that works on all devices
- **Local Storage**: Persist user data and preferences

## Setup Instructions

### 1. Get OMDb API Key

1. Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free API key
3. You'll receive an API key via email

### 2. Configure Environment Variables

1. Copy the `.env` file in the project root
2. Replace `your_api_key_here` with your actual OMDb API key:

```env
VITE_OMDB_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## API Usage

The application uses the OMDb API for:

- **Movie Search**: `http://www.omdbapi.com/?apikey=[yourkey]&s=[search_term]&type=movie&page=1`
- **Movie Details**: `http://www.omdbapi.com/?apikey=[yourkey]&i=[imdb_id]&plot=full`
- **Poster Requests**: Movie posters are served directly from OMDb API responses

## Password Requirements

For user registration, passwords must contain:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **OMDb API** for movie data

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.# movie_explorer

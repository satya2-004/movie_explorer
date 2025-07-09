# Movie Explorer 🎬

A beautiful, production-ready movie search and watchlist application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎭 User Authentication**: Secure login and registration with password validation
- **🔍 Movie Search**: Search movies using the OMDb API with debounced input
- **📝 Watchlist Management**: Add/remove movies to your personal watchlist
- **📖 Movie Details**: View detailed information about movies in a slide-out drawer
- **🌙 Dark/Light Theme**: Toggle between dark and light modes
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **💾 Local Storage**: Persist user data and preferences

## 🚀 Live Demo

[Add your deployed link here]

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **OMDb API** for movie data

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OMDb API key

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/satya2-004/movie_explorer.git
cd movie_explorer
```

### 2. Get OMDb API Key

1. Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free API key
3. You'll receive an API key via email

### 3. Configure Environment Variables

1. Create a `.env` file in the project root
2. Add your OMDb API key:

```env
VITE_OMDB_API_KEY=your_actual_api_key_here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Login/Register form
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Header.tsx      # Navigation header
│   ├── HomeMovies.tsx  # Home page movies
│   ├── MovieCard.tsx   # Individual movie card
│   ├── MovieDetailsDrawer.tsx # Movie details panel
│   ├── MovieGrid.tsx   # Movie grid layout
│   ├── SearchBar.tsx   # Search functionality
│   └── Watchlist.tsx   # Watchlist component
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme state
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounce hook
│   ├── useMovieSearch.ts # Movie search hook
│   └── usePopularMovies.ts # Popular movies hook
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🔑 API Usage

The application uses the OMDb API for:

- **Movie Search**: `http://www.omdbapi.com/?apikey=[yourkey]&s=[search_term]&type=movie&page=1`
- **Movie Details**: `http://www.omdbapi.com/?apikey=[yourkey]&i=[imdb_id]&plot=full`
- **Poster Requests**: Movie posters are served directly from OMDb API responses

## 🔒 Password Requirements

For user registration, passwords must contain:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist/` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Satya** - [GitHub](https://github.com/satya2-004)

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

---

⭐ If you like this project, please give it a star!

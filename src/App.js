import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com?apiKey=" + process.env.REACT_APP_OMDBAPI_API_KEY;
const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('superman')
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(searchTerm);
        searchMovies(searchTerm ? searchTerm : 'superman');
      }}>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => { searchMovies(searchTerm); }}
          />
        </div>
      </form>

      {
        movies?.length > 0 ?
          (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">No movies Found</div>
          )
      }


    </div>
  );
}

export default App;
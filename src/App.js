import React from "react";
import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from "./search.svg";
// d29172ae

const API_URL = "http://www.omdbapi.com?apiKey=d29172ae";
const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(searchTerm);
        searchMovies(searchTerm ? searchTerm : 'Spiderman');
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
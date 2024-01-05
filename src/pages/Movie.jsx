import React, { useState, useEffect } from "react";
import MovieDescription from "../components/MovieDescription";
import Loading from "../components/Loading";

import "./Movies.css";
import Navbar from "../components/Navbar";

const StarWarsMovies = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedFilms = localStorage.getItem("cachedFilms");

    if (cachedFilms) {
      setFilms(JSON.parse(cachedFilms));
      setLoading(false);
    } else {
      fetch("https://swapi.dev/api/films/")
        .then((response) => response.json())
        .then((data) => {
          setFilms(data.results);
          setLoading(false);

          localStorage.setItem("cachedFilms", JSON.stringify(data.results));
        })
        .catch((error) => {
          console.error("Erro ao obter filmes:", error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="title">Star Wars - Lista de Filmes:</h2>
      <div className="movies-container">
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          films.map((film) => (
            <div className="movie-item" key={film.episode_id}>
              <MovieDescription movie={film} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StarWarsMovies;

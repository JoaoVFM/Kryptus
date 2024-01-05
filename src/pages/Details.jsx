import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDescription from "../components/MovieDescription";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useCharacterCache } from "./CarachtersCacheContext";

import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCharacterFromCache, updateCache } = useCharacterCache();

  const replaceURIs = async (characters) => {
    try {
      const charactersPromises = characters.map(async (characterUrl) => {
        if (getCharacterFromCache(characterUrl)) {
          return getCharacterFromCache(characterUrl);
        } else {
          const response = await fetch(characterUrl);
          const characterData = await response.json();
          const characterName = characterData.name || "Personagem desconhecido";
          updateCache(characterUrl, characterName);
          return characterName;
        }
      });
      return await Promise.all(charactersPromises);
    } catch (error) {
      console.error("Erro ao obter detalhes dos personagens:", error);
      return characters.map(() => "Personagem desconhecido");
    }
  };

  useEffect(() => {
    const filmUrl = `https://swapi.dev/api/films/${id}`;

    const getMovie = async (filmUrl) => {
      try {
        setLoading(true);
        const response = await fetch(filmUrl);
        const data = await response.json();
        const charactersNames = await replaceURIs(data.characters);
        const updatedMovie = { ...data, characters: charactersNames };
        setMovie(updatedMovie);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter detalhes do filme:", error);
        setLoading(false);
      }
    };

    getMovie(filmUrl);
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="movie-page">
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          movie && (
            <div className="movie-card">
              <MovieDescription movie={movie} showLink={false} />
              <div className="info">
                <h3>Sinopse</h3>
                <p className="info-text">{movie.opening_crawl}</p>
              </div>
              <div className="info">
                <h3>Personagens:</h3>
                <div className="horizontal-list">
                  {movie.characters.map((character, index) => (
                    <span key={index}>
                      {character}
                      {index !== movie.characters.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Diretor:</h3>
                <p className="info-text">{movie.director}</p>
              </div>
              <div className="info">
                <h3>Data de lançamento:</h3>
                <p className="info-text">{movie.release_date}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Details;

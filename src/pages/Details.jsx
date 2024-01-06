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

    const getSpecies = async (speciesUrls) => {
      try {
        const speciesPromises = speciesUrls.map(async (speciesUrl) => {
          if (getCharacterFromCache(speciesUrl)) {
            return getCharacterFromCache(speciesUrl);
          } else {
            const response = await fetch(speciesUrl);
            const speciesData = await response.json();
            const speciesName = speciesData.name || "Espécie desconhecida";
            updateCache(speciesUrl, speciesName);
            return speciesName;
          }
        });
        return await Promise.all(speciesPromises);
      } catch (error) {
        console.error("Erro ao obter detalhes das espécies:", error);
        return speciesUrls.map(() => "Espécie desconhecida");
      }
    };

    const getStarships = async (starshipsUrls) => {
      try {
        const starshipsPromises = starshipsUrls.map(async (starshipsUrl) => {
          if (getCharacterFromCache(starshipsUrl)) {
            return getCharacterFromCache(starshipsUrl);
          } else {
            const response = await fetch(starshipsUrl);
            const starshipsData = await response.json();
            const starshipsName =
              starshipsData.name || "Starships desconhecida";
            updateCache(starshipsUrl, starshipsName);
            return starshipsName;
          }
        });
        return await Promise.all(starshipsPromises);
      } catch (error) {
        console.error("Erro ao obter detalhes das starships:", error);
        return starshipsUrls.map(() => "Starship desconhecida");
      }
    };

    const getPlanets = async (planetsUrls) => {
      try {
        const planetsPromises = planetsUrls.map(async (planetUrl) => {
          if (getCharacterFromCache(planetUrl)) {
            return getCharacterFromCache(planetUrl);
          } else {
            const response = await fetch(planetUrl);
            const planetData = await response.json();
            const planetName = planetData.name || "Planeta desconhecido";
            updateCache(planetUrl, planetName);
            return planetName;
          }
        });
        return await Promise.all(planetsPromises);
      } catch (error) {
        console.error("Erro ao obter detalhes dos planetas:", error);
        return planetsUrls.map(() => "Planeta desconhecido");
      }
    };

    const getVehicles = async (vehiclesUrls) => {
      try {
        const vehiclesPromises = vehiclesUrls.map(async (vehicleUrl) => {
          if (getCharacterFromCache(vehicleUrl)) {
            return getCharacterFromCache(vehicleUrl);
          } else {
            const response = await fetch(vehicleUrl);
            const vehicleData = await response.json();
            const vehicleName = vehicleData.name || "Veículo desconhecido";
            updateCache(vehicleUrl, vehicleName);
            return vehicleName;
          }
        });
        return await Promise.all(vehiclesPromises);
      } catch (error) {
        console.error("Erro ao obter detalhes dos veículos:", error);
        return vehiclesUrls.map(() => "Veículo desconhecido");
      }
    };

    const getMovie = async (filmUrl) => {
      try {
        setLoading(true);
        const response = await fetch(filmUrl);
        const data = await response.json();

        const charactersNames = await replaceURIs(data.characters);
        const speciesNames = await getSpecies(data.species);
        const starshipsNames = await getStarships(data.starships);
        const planetsNames = await getPlanets(data.planets);
        const vehiclesNames = await getVehicles(data.vehicles);
        const updatedMovie = {
          ...data,
          characters: charactersNames,
          species: speciesNames,
          starships: starshipsNames,
          planets: planetsNames,
          vehicles: vehiclesNames,
        };
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
                <h3>Espécies:</h3>
                <div className="horizontal-list">
                  {movie.species.map((specie, index) => (
                    <span key={index}>
                      {specie}
                      {index !== movie.species.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Starships:</h3>
                <div className="horizontal-list">
                  {movie.starships.map((starship, index) => (
                    <span key={index}>
                      {starship}
                      {index !== movie.starships.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Planetas:</h3>
                <div className="horizontal-list">
                  {movie.planets.map((planet, index) => (
                    <span key={index}>
                      {planet}
                      {index !== movie.planets.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Veículos:</h3>
                <div className="horizontal-list">
                  {movie.vehicles.map((vehicle, index) => (
                    <span key={index}>
                      {vehicle}
                      {index !== movie.vehicles.length - 1 ? ", " : ""}
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

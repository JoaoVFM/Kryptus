import React, { createContext, useContext, useEffect, useState } from "react";

const CharacterCacheContext = createContext();

export const useCharacterCache = () => {
  return useContext(CharacterCacheContext);
};

export const CharacterCacheProvider = ({ children }) => {
  const [characterCache, setCharacterCache] = useState({});
  const [charactersList, setCharactersList] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [starshipsList, setStarshipsList] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people");
        const data = await response.json();
        setCharactersList(data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    const fetchSpecies = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/species");
        const data = await response.json();
        setSpeciesList(data.results);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };

    const fetchStarships = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/starships");
        const data = await response.json();
        setStarshipsList(data.results);
      } catch (error) {
        console.error("Error fetching Starships:", error);
      }
    };

    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/planets");
        const data = await response.json();
        setPlanetsList(data.results);
      } catch (error) {
        console.error("Error fetching Planets:", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/vehicles");
        const data = await response.json();
        setVehiclesList(data.results);
      } catch (error) {
        console.error("Error fetching Vehicles:", error);
      }
    };

    fetchStarships();
    fetchCharacters();
    fetchSpecies();
    fetchPlanets();
    fetchVehicles();
  }, []);

  const updateCache = (key, value) => {
    setCharacterCache((prevCache) => ({
      ...prevCache,
      [key]: value,
    }));
  };

  const getCharacterFromCache = (key) => {
    return characterCache[key];
  };

  const getSpeciesFromCache = (key) => {
    return (
      speciesList.find((species) => species.url === key)?.name ||
      "Espécie desconhecida"
    );
  };

  const getStarshipsFromCache = (key) => {
    return (
      starshipsList.find((starships) => starships.url === key)?.name ||
      "Starship desconhecida"
    );
  };

  const getPlanetsFromCache = (key) => {
    return (
      planetsList.find((planet) => planet.url === key)?.name ||
      "Planeta desconhecido"
    );
  };

  const getVehiclesFromCache = (key) => {
    return (
      vehiclesList.find((vehicle) => vehicle.url === key)?.name ||
      "Veículo desconhecido"
    );
  };

  return (
    <CharacterCacheContext.Provider
      value={{
        characterCache,
        updateCache,
        getCharacterFromCache,
        getSpeciesFromCache,
        getStarshipsFromCache,
        getPlanetsFromCache,
        getVehiclesFromCache,
        charactersList,
        speciesList,
        starshipsList,
        planetsList,
        vehiclesList,
      }}
    >
      {children}
    </CharacterCacheContext.Provider>
  );
};

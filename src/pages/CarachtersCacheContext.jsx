import React, { createContext, useContext, useState } from "react";

const CharacterCacheContext = createContext();

export const useCharacterCache = () => {
  return useContext(CharacterCacheContext);
};

export const CharacterCacheProvider = ({ children }) => {
  const [characterCache, setCharacterCache] = useState({});

  const updateCache = (key, value) => {
    setCharacterCache((prevCache) => ({
      ...prevCache,
      [key]: value,
    }));
  };

  const getCharacterFromCache = (key) => {
    return characterCache[key];
  };

  return (
    <CharacterCacheContext.Provider
      value={{ characterCache, updateCache, getCharacterFromCache }}
    >
      {children}
    </CharacterCacheContext.Provider>
  );
};

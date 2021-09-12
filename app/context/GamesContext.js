import React, { useState, createContext } from "react";

export const GamesContext = createContext();

export const GamesProvider = (props) => {
  const [games, setGames] = useState([]);

  return (
    <GamesContext.Provider value={[games, setGames]}>
      {props.children}
    </GamesContext.Provider>
  );
};

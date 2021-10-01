import React, { useState, createContext } from "react";

export const GameLoadingContext = createContext();

export const GameLoadingProvider = (props) => {
  const [gameLoading, setGameLoading] = useState(false);

  return (
    <GameLoadingContext.Provider value={[gameLoading, setGameLoading]}>
      {props.children}
    </GameLoadingContext.Provider>
  );
};

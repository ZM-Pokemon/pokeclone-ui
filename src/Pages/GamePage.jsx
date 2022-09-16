import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import GameCanvas from "../Components/GameCanvas/GameCanvas";

const GamePage = () => {
  const [starterPokemon, setStarterPokemon] = useState();
  //   const [pokeApi, setPokeApi] = useState();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/charmander").then((res) => {
      setStarterPokemon(res.data);
    });
  }, []);

  return (
    <div>
      <GameCanvas starterPokemon={starterPokemon} />
    </div>
  );
};

export default GamePage;

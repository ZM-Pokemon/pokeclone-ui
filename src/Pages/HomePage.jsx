import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GameCanvas from "../Components/GameCanvas/GameCanvas";

const HomePage = () => {
  //   const [wildPokemon, setWildPokemon] = useState([]);
  const [pokeApi, setPokeApi] = useState();
  const [battlePoke, setBattlePoke] = useState();
  //   const wildPoke = [];

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
      .then((res) => {
        setPokeApi(res.data.results);
        //   axios.get(poke.url).then((res) => {
        //     setWildPokemon([...wildPokemon, res.data]);
        //   });
      });
  }, []);

  return (
    <div>
      <GameCanvas
        pokeApi={pokeApi}
        battlePoke={battlePoke}
        setBattlePoke={setBattlePoke}
      />
    </div>
  );
};

export default HomePage;

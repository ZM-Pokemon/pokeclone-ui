import "./App.css";
import { Routes, Route } from "react-router-dom";
import GameCanvas from "./Components/GameCanvas/GameCanvas";
import GamePage from "./Pages/GamePage";
import { useState } from "react";
import HomePage from "./Pages/HomePage";
import SecretLogin from "./Pages/SecretLogin";

function App() {
  const [starterPokeSearch, setStarterPokeSearch] = useState({
    name: "",
    pokemon: "",
  });

  const [starterPokemon, setStarterPokemon] = useState();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            setStarterPokeSearch={setStarterPokeSearch}
            starterPokeSearch={starterPokeSearch}
            setStarterPokemon={setStarterPokemon}
          />
        }
      />
      <Route
        path="/secretlogin"
        element={
          <SecretLogin
            setStarterPokeSearch={setStarterPokeSearch}
            starterPokeSearch={starterPokeSearch}
            setStarterPokemon={setStarterPokemon}
          />
        }
      />

      <Route
        path="/play"
        element={
          <GamePage
            starterPokemon={starterPokemon}
            // starterPokeSearch={starterPokeSearch}
          />
        }
      />
    </Routes>
  );
}

export default App;

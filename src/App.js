import "./App.css";
import { Routes, Route } from "react-router-dom";
import GameCanvas from "./Components/GameCanvas/GameCanvas";
import GamePage from "./Pages/GamePage";
import { useState } from "react";
import HomePage from "./Pages/HomePage";

function App() {
  const [starterPokeSearch, setStarterPokeSearch] = useState({
    name: "",
    pokemon: "",
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            setStarterPokeSearch={setStarterPokeSearch}
            starterPokeSearch={starterPokeSearch}
          />
        }
      />

      <Route path="/play" element={<GamePage />} />
    </Routes>
  );
}

export default App;

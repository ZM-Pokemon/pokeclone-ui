import "./App.css";
import { Routes, Route } from "react-router-dom";
import GameCanvas from "./Components/GameCanvas/GameCanvas";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;

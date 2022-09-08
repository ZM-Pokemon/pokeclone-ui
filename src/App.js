import "./App.css";
import { Routes, Route } from "react-router-dom";
import GameCanvas from "./Components/GameCanvas/GameCanvas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameCanvas />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const HomePage = ({ starterPokeSearch, setStarterPokeSearch }) => {
  const handleChange = (e) => {
    setStarterPokeSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Welcome to my PokeClone!</h1>
        <h3>Please enter your name and choose your starter pokemon!</h3>
      </div>
    </div>
  );
};

export default HomePage;

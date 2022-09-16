import * as React from "react";
import Typewriter from "typewriter-effect";
import "./css/homepage.css";

const HomePage = ({ starterPokeSearch, setStarterPokeSearch }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStarterPokeSearch((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <div className="main">
      <div className="typewriterDiv">
        <Typewriter
          wrapperClassName="typewriter"
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to my PokeClone!")
              .pauseFor(2500)
              .deleteAll()
              .typeString(
                "Please enter your name and choose a starter pokemon!"
              )
              .start();
          }}
        />
      </div>

      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div className="name">
            <label for="name">Enter your name:</label>
            <input
              type="text"
              placeholder="Name"
              value={starterPokeSearch.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="poke">
            <label for="pokemon">Choose a Pokemon:</label>
            <select id="pokemon" name="pokemon" onChange={handleChange}>
              <option value="pikachu">Pikachu</option>
              <option value="charmander">Charmander</option>
              <option value="bulbasaur">Bulbasaur</option>
              <option value="squirtle">Squirtle</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;

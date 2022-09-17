import axios from "axios";
import * as React from "react";
import Typewriter from "typewriter-effect";
import "./css/homepage.css";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = ({
  starterPokeSearch,
  setStarterPokeSearch,
  setStarterPokemon,
}) => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStarterPokeSearch((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://pokeclone-zm-api.herokuapp.com//signup", starterPokeSearch)
      //   .post("http://localhost:8000/signup", starterPokeSearch)
      .then((res) => {
        console.log(res);
        // navigate("/play", { replace: true });
      })
      .then(() => {
        axios
          .get(`http://pokeapi.co/api/v2/pokemon/${starterPokeSearch.pokemon}`)
          .then((res) => {
            setStarterPokemon(res.data);
            setTimeout(() => {
              navigate("/play", { replace: true });
            }, 2000);
          });
      });
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
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              placeholder="Name"
              value={starterPokeSearch.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="poke">
            <label htmlFor="pokemon">Choose a Pokemon:</label>
            <select id="pokemon" name="pokemon" onChange={handleChange}>
              <option value="">...</option>
              <option value="pikachu">Pikachu</option>
              <option value="charmander">Charmander</option>
              <option value="bulbasaur">Bulbasaur</option>
              <option value="squirtle">Squirtle</option>
            </select>
          </div>
          <div style={{ textAlign: "center", margin: 20 }}>
            <input
              type="submit"
              value={"Let's Go!"}
              style={{ marginRight: 35 }}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import map from "../../Assets/MAP.png";
import axios from "axios";
import collisions from "./collisions";
import battleZonesData from "./battleZone";
import down from "../../Assets/playerDown.png";
import up from "../../Assets/playerUp.png";
import right from "../../Assets/playerRight.png";
import left from "../../Assets/playerLeft.png";
import pokeBattle from "../../Assets/ppokebattle.png";
import { useEffect, useRef, useLayoutEffect } from "react";
import styled, { keyframes, withTheme } from "styled-components";
import { Howl, Howler } from "howler";
import gameMusicFile from "../../Assets/102-palette town theme.mp3";
import battleMusicFile from "../../Assets/107-battle (vs wild pokemon).mp3";
import victoryMusicFile from "../../Assets/108-victory (vs wild pokemon).mp3";
import gsap from "gsap";
import "./styles.css";

const flash = keyframes`
   from { opacity: 1.0; }
    to { opacity: 0.0; }
`;

let BattleDiv = styled.div`
  background-color: black;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation-name: ${flash};
  animation-iteration-count: 3;
  animation-duration: 0.5s;
`;

let ParentDiv = styled.div`
  display: inline-block;
  position: relative;
  /* pointer-events: none; */
`;

const GameCanvas = ({ starterPokemon }) => {
  const [battleInitiation, setBattleInitiation] = useState(false);
  const [battleInitiation2, setBattleInitiation2] = useState(false);
  //   const [battlePlayers, setBattlePlayers] = useState([]);
  const [battlePoke, setBattlePoke] = useState();
  //   const [num, setNum] = useState(1);

  //sounds
  const gameMusic = new Howl({
    src: [gameMusicFile],
    loop: true,
    volume: 0.05,
  });

  const battleMusic = new Howl({
    src: [battleMusicFile],

    loop: true,
    volume: 0.05,
  });

  const victoryMusic = new Howl({
    src: [victoryMusicFile],

    loop: true,
    volume: 0.05,
  });

  //   function randomNumberInRange(min, max) {
  //     // 👇️ get number between min (inclusive) and max (inclusive)
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  //   }
  const playerPoke = useRef();
  const opponent = useRef();
  const playerPokeSprite = useRef();

  setTimeout(() => {
    playerPoke.current = starterPokemon;
  }, 3000);
  const pokeTest = [];
  const pokeTest2 = [];
  useEffect(() => {
    gameMusic.play();
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => {
        res.data.results.forEach((poke) => {
          pokeTest.push(poke);
        });
      })
      .then((res) => {
        pokeTest.forEach((p) => {
          axios.get(p.url).then((res) => {
            pokeTest2.push(res.data);
            // console.log(pokeTest2);
          });
        });
      });
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       // 👇️ generate random number between 1 and 10
  //       setNum(randomNumberInRange(0, 150));
  //     }, 5000); // 👈️ runs every 1 second

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);
  //   axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => {
  //     setBattlePoke(res.data);
  //   });

  // Canvas setup
  const battleText = useRef();
  const canvasRef = useRef();
  const battleDivRef = useRef();
  const requestRef = useRef();
  let width = 700;
  let height = 467;

  ////Collisions setup
  //////loops through collission arrays for the amount of tiles our map is
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i));
  }

  //battlezones setup
  const battleZonesMap = [];
  for (let i = 0; i < battleZonesData.length; i += 160) {
    battleZonesMap.push(battleZonesData.slice(i, 160 + i));
  }

  //image setups
  const mapImg = new Image();
  mapImg.src = map;
  const playerImgDown = new Image();
  playerImgDown.src = down;
  const playerImgUp = new Image();
  playerImgUp.src = up;
  const playerImgRight = new Image();
  playerImgRight.src = right;
  const playerImgLeft = new Image();
  playerImgLeft.src = left;
  const battleBackgroundImg = new Image();
  battleBackgroundImg.src = pokeBattle;

  //image tuning
  const keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  };
  let lastKey = "";
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = true;
        lastKey = "w";
        break;
      case "a":
        keys.a.pressed = true;
        lastKey = "a";
        break;
      case "s":
        keys.s.pressed = true;
        lastKey = "s";
        break;
      case "d":
        keys.d.pressed = true;
        lastKey = "d";
        break;
      default:
        e.preventDefault();
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
      default:
        e.preventDefault();
    }
  });

  //loading and animation

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function setRandomPoke(num) {
      console.log(playerPoke);
      battleImg.src = pokeTest2[num].sprites.front_default;
      setBattlePoke(pokeTest2[num]);
      playerPokeImg.src = playerPoke.current.sprites.back_default;
      opponent.current.name = pokeTest2[num].name;
      //   opponent.current.moves = [
      //     { name: "Tackle", damage: 12 },
      //     { name: "Bite", damage: 10 },
      //     { name: "Headbutt", damage: 14 },
      //     { name: "hidden-power", damage: 12 },
      //   ];

      playerPokeSprite.current.name = playerPoke.current.name;
    }
    //background offset
    const offSet = {
      x: -1113,
      y: -2770,
      //   x: -1113,
      //   y: -2700,
    };

    //collision class
    class Boundary {
      static width = 50.4;
      static height = 50.4;
      constructor({ position }) {
        this.position = position;
        //12x12 * 420% zoom
        this.width = 50.4;
        this.height = 50.4;
      }

      draw() {
        context.fillStyle = "rgba(255, 0, 0, 0)";
        context.fillRect(
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
      }
    }
    const boundaries = [];
    collisionsMap.forEach((row, i) => {
      row.forEach((pos, j) => {
        if (pos === 1025)
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offSet.x,
                y: i * Boundary.height + offSet.y,
                // x: j + offSet.x,
                // y: i + offSet.y,
              },
            })
          );
      });
    });

    const battleZones = [];
    battleZonesMap.forEach((row, i) => {
      row.forEach((pos, j) => {
        if (pos === 1025)
          battleZones.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offSet.x,
                y: i * Boundary.height + offSet.y,
                // x: j + offSet.x,
                // y: i + offSet.y,
              },
            })
          );
      });
    });

    const battle = {
      initiated: false,
    };

    //player/map movement class
    class Sprite {
      constructor({
        position,
        velocity,
        image,
        frames = { max: 1 },
        sprites = [],
        isEnemy = false,
        name,
      }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
        this.moving = false;
        this.sprites = sprites;
        this.opacity = 1;
        this.health = 100;
        this.isEnemy = isEnemy;
        this.name = name;
      }

      draw() {
        context.save();
        context.globalAlpha = this.opacity;
        context.drawImage(
          //cropping
          this.image,
          this.frames.val * 48,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          //actual
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );
        context.restore();
        //walking animation
        if (!this.moving) return;

        if (this.frames.max > 1) {
          this.frames.elapsed++;
        }
        if (this.frames.elapsed % 10 === 0) {
          if (this.frames.val < this.frames.max - 1) {
            this.frames.val++;
          } else {
            this.frames.val = 0;
          }
        }
      }
      attack({ attack, recipient }) {
        battleText.current.style.display = "block";
        battleText.current.innerHTML = this.name + " used " + attack.name;
        // battleText.current.addEventListener("click", (e) => {
        //   if (queue.length >= 0) {
        //     queue[0]();
        //     queue.shift();
        //   } else e.currentTarget.style.display = "none";
        // });
        const tl = gsap.timeline();

        this.health -= attack.damage;

        let movementDistance = 10;
        if (this.isEnemy) movementDistance = -10;

        let healthBar = "#enemyHealthBar";
        if (this.isEnemy) healthBar = "#playerHealthBar";

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //actual hit
              gsap.to(healthBar, {
                width: this.health - attack.damage + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
      }
    }
    const player = new Sprite({
      position: {
        //192x68 is sprite dimensions
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 4,
      },
      image: playerImgDown,
      frames: {
        max: 4,
      },
      sprites: {
        up: playerImgUp,
        left: playerImgLeft,
        down: playerImgDown,
        right: playerImgRight,
      },
    });

    const background = new Sprite({
      position: {
        x: offSet.x,
        y: offSet.y,
      },
      image: mapImg,
    });

    const movables = [background, ...boundaries, ...battleZones];
    function retangularCollision({ rectangle1, rectangle2 }) {
      return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
      );
    }

    function animate() {
      //creates loop
      requestRef.current = window.requestAnimationFrame(animate);
      //   console.log(requestRef.current);

      //draws background using Sprite constructor
      background.draw();
      //drawing boundaries
      boundaries.forEach((boundary) => {
        boundary.draw();
      });
      battleZones.forEach((battlezone) => {
        battlezone.draw();
      });

      //draws player on map
      player.draw();

      let moving = true;
      player.moving = false;
      //battle zones
      if (battle.initiated) return;
      if (
        keys.w.pressed ||
        keys.a.pressed ||
        keys.s.pressed ||
        keys.d.pressed
      ) {
        for (let i = 0; i < battleZones.length; i++) {
          const battleZone = battleZones[i];
          //player collision if else
          if (
            retangularCollision({
              rectangle1: player,
              rectangle2: battleZone,
            }) &&
            Math.random() < 0.003
          ) {
            window.cancelAnimationFrame(requestRef.current);
            gameMusic.stop();
            battleMusic.play();
            battle.initiated = true;
            player.moving = false;
            setBattleInitiation(true);
            setRandomPoke(Math.floor(Math.random() * pokeTest2.length));

            // battleImg.src =
            //   pokeTest2[
            //     Math.floor(Math.random() * pokeTest2.length)
            //   ].sprites.front_default;

            setTimeout(() => {
              animateBattle();
              setBattleInitiation2(true);
              setBattleInitiation(false);
            }, 1500);
            break;
          }
        }
      }
      //player collision if else

      if (keys.w.pressed && lastKey === "w") {
        player.image = player.sprites.up;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //player collision if else
          if (
            retangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        //player movement
        if (moving)
          movables.forEach((movable) => {
            movable.position.y += 3;
          });
      } else if (keys.a.pressed && lastKey === "a") {
        player.image = player.sprites.left;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //player collision if else
          if (
            retangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        //player movement
        if (moving)
          movables.forEach((movable) => {
            movable.position.x += 3;
          });
      } else if (keys.s.pressed && lastKey === "s") {
        player.image = player.sprites.down;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //player collision if else
          if (
            retangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        //player movement
        if (moving)
          movables.forEach((movable) => {
            movable.position.y -= 3;
          });
      } else if (keys.d.pressed && lastKey === "d") {
        player.image = player.sprites.right;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //player collision if else
          if (
            retangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        //player movement
        if (moving)
          movables.forEach((movable) => {
            movable.position.x -= 3;
          });
      }
    }
    animate();
    //battle animation
    const battleBackground = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: battleBackgroundImg,
    });
    const battleImg = new Image();
    const playerPokeImg = new Image();

    // const opponent = new Sprite({
    //   position: {
    //     x: 470,
    //     y: 110,
    //   },
    //   image: battleImg || "",
    // });
    // const playerPokeSprite = new Sprite({
    //   position: {
    //     x: 140,
    //     y: 240,
    //   },
    //   image: playerPokeImg || "",
    // });
    opponent.current = new Sprite({
      position: {
        x: 470,
        y: 110,
      },
      image: battleImg || "",
      isEnemy: true,
    });
    playerPokeSprite.current = new Sprite({
      position: {
        x: 140,
        y: 240,
      },
      image: playerPokeImg || "",
    });

    function animateBattle() {
      window.requestAnimationFrame(animateBattle);
      battleBackground.draw();
      opponent?.current.draw();
      playerPokeSprite.current.draw();
    }
  }, []);

  const queue = [];
  const opponentMoves = [
    { name: "Tackle", damage: 12 },
    { name: "Bite", damage: 10 },
    { name: "Headbutt", damage: 14 },
    { name: "hidden-power", damage: 12 },
  ];

  let opponentMove = opponentMoves[Math.floor(Math.random() * 4)];

  function handleClick(move) {
    playerPokeSprite.current.attack({
      attack: {
        name: move,
        damage: 15,
      },
      recipient: opponent.current,
    });
    queue.push(() => {
      opponent.current.attack({
        attack: {
          name: opponentMove.name,
          damage: opponentMove.damage,
        },
        recipient: playerPokeSprite.current,
      });
    });
    console.log(queue);
  }

  function handleDialog(e) {
    if (queue.length > 0) {
      queue[0]();
      queue.shift();
      opponentMove = opponentMoves[Math.floor(Math.random() * 4)];
    } else e.currentTarget.style.display = "none";
  }

  let move1 = starterPokemon?.moves[Math.floor(Math.random() * 99)].move.name;
  let move2 = starterPokemon?.moves[Math.floor(Math.random() * 99)].move.name;
  let move3 = starterPokemon?.moves[Math.floor(Math.random() * 99)].move.name;
  let move4 = starterPokemon?.moves[Math.floor(Math.random() * 99)].move.name;

  return (
    <ParentDiv>
      {battleInitiation ? <BattleDiv ref={battleDivRef}></BattleDiv> : null}
      {battleInitiation2 ? (
        <div className="opponent">
          {battlePoke?.name}
          <div className="healthBarDiv">
            <div className="healthBarPotential"></div>
            <div id="enemyHealthBar" className="healthBar"></div>
          </div>
        </div>
      ) : null}
      <canvas ref={canvasRef} height={height} width={width} />
      {battleInitiation2 ? (
        <div className="abilityBar">
          <div className="buttonDiv">
            <div ref={battleText} onClick={handleDialog} className="battleText">
              dsadas
            </div>
            <button onClick={() => handleClick(move1)}>{move1}</button>
            <button onClick={() => handleClick(move2)}>{move2}</button>
            <button onClick={() => handleClick(move3)}>{move3}</button>
            <button onClick={() => handleClick(move4)}>{move4}</button>
          </div>
          <div className="playerDiv">
            <div className="playerName">{starterPokemon?.name}</div>
            <div>
              <div className="playerHealthPotential"></div>
              <div id="playerHealthBar" className="playerHealth"></div>
            </div>
          </div>
        </div>
      ) : null}
    </ParentDiv>
  );
};

export default GameCanvas;

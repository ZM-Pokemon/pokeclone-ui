import React from "react";
import map from "../../Assets/MAP.png";
import collisions from "./collisions";
import down from "../../Assets/playerDown.png";
import up from "../../Assets/playerUp.png";
import right from "../../Assets/playerRight.png";
import left from "../../Assets/playerLeft.png";
import { useEffect, useRef } from "react";

const GameCanvas = () => {
  // Canvas setup
  const canvasRef = useRef();
  let width = 700;
  let height = 600;

  ////Collisions setup
  //////loops through collission arrays for the amount of tiles our map is
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i));
  }

  //image setups
  const mapImg = new Image();
  mapImg.src = map;
  const playerImg = new Image();
  playerImg.src = down;

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //background offset
    const offSet = {
      x: -1113,
      y: -2700,
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
        context.fillStyle = "#FF0000";
        context.fillRect(
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
      }
    }
    const boundaries = [];
    collisionsMap.map((row, i) => {
      row.map((pos, j) => {
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
    console.log(boundaries);

    //player/map movement class
    class Sprite {
      constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
      }

      draw() {
        context.drawImage(
          //cropping
          this.image,
          0,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          //actual
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );
      }
    }
    const player = new Sprite({
      position: {
        //192x68 is sprite dimensions
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 4,
      },
      image: playerImg,
      frames: {
        max: 4,
      },
    });

    const background = new Sprite({
      position: {
        x: offSet.x,
        y: offSet.y,
      },
      image: mapImg,
    });

    const movables = [background, ...boundaries];
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
      window.requestAnimationFrame(animate);
      //draws background using Sprite constructor
      background.draw();
      //drawing boundaries
      boundaries.map((boundary) => {
        boundary.draw();

        //player collision if else
        if (
          retangularCollision({
            rectangle1: player,
            rectangle2: boundary,
          })
        ) {
          console.log("colliding");
        }
      });

      //draws player on map
      player.draw();
      //player collision if else

      if (keys.w.pressed && lastKey === "w") {
        //player movement
        movables.forEach((movable) => {
          movable.position.y += 3;
        });
      } else if (keys.a.pressed && lastKey === "a") {
        movables.forEach((movable) => {
          movable.position.x += 3;
        });
      } else if (keys.s.pressed && lastKey === "s") {
        movables.forEach((movable) => {
          movable.position.y -= 3;
        });
      } else if (keys.d.pressed && lastKey === "d") {
        movables.forEach((movable) => {
          movable.position.x -= 3;
        });
      }
    }
    animate();
  }, []);

  return <canvas ref={canvasRef} height={height} width={width} />;
};

export default GameCanvas;

import Game from "./game.js";

let canvas = document.getElementById("game_screen");
let ctx = canvas.getContext("2d");

// //square (x, y, width, height)
// //have to update "fillStyle" anytime you add a new square
// ctx.fillStyle = "goldenrod";
// ctx.fillRect(20, 20, 100, 100);

// display position for the game
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// last time
let last_time = 0;

// main game loop
function game_loop(time_stamp) {
  // calculating how much time has passed
  let delta_time = time_stamp - last_time;
  last_time = time_stamp;

  //clearing the screen (between every frame)
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(delta_time);
  game.draw(ctx);

  // calls the game again with the next frames timestamp
  requestAnimationFrame(game_loop);
}

// start game (gives us a valid timestamp)
requestAnimationFrame(game_loop);

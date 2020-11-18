import Game from "./game.js";
import Paddle from "./paddle.js";

export default class input_handler {
  // moving paddle
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 65:
          paddle.move_left();
          break;
        case 68:
          paddle.move_right();
          break;

        case 27:
          game.toggle_pause();
          break;

        case 32:
          game.start();
          break;
      }
    });

    //stopping the paddle when key is released
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 65:
          if (paddle.speed < 0) paddle.stop();
          break;
        case 68:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}

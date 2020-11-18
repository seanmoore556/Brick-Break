import { detect_collision } from "./collision_detection.js";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.game_width = game.game_width;
    this.game_height = game.game_height;

    this.game = game;
    this.size = 17;
    this.reset();
  }

  // ball reset
  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 6, y: -2 };
  }

  draw(ctx) {
    //draw ball (image, x, y, width, height)
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //collision check for left or right walls
    if (this.position.x + this.size > this.game_width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //collision check for top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    // bottom of game
    if (this.position.y - this.size > this.game_height) {
      this.game.lives--;
      this.reset();
    }

    if (detect_collision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}

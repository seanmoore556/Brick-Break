import { detect_collision } from "./collision_detection.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game_width = game.game_width;
    this.game_height = game.game_height;

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.marked_for_deletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (detect_collision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.marked_for_deletion = true;
    }
  }
}

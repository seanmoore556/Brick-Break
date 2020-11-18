export default class Paddle {
  constructor(game) {
    this.game_width = game.game_width;

    this.width = 150;
    this.height = 20;

    //max speed
    this.max_speed = 8;
    this.speed = 0;

    // object
    this.position = {
      x: game.game_width / 2 - this.width / 2,
      y: game.game_height - this.height - 10,
    };
  }

  // moving
  move_left() {
    this.speed = -this.max_speed;
  }
  move_right() {
    this.speed = this.max_speed;
  }

  //stop function
  stop() {
    this.speed = 0;
  }

  //drawing the paddle
  draw(ctx) {
    ctx.fillStyle = "goldenrod";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  //updating (moving) the paddle
  update(delta_time) {
    this.position.x += this.speed;

    //so paddle cannot leave screen
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.game_width)
      this.position.x = this.game_width - this.width;
  }
}

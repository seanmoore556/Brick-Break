import Paddle from "./paddle.js";
import input_handler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

import { build_level, level_1, level_2 } from "./levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4,
};

export default class Game {
  constructor(game_width, game_height) {
    this.game_width = game_width;
    this.game_height = game_height;
    this.game_state = GAME_STATE.MENU;
    // paddle
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.game_objects = [];
    this.bricks = [];
    this.lives = 2;

    this.levels = [level_1, level_2];
    this.current_level = 0;

    new input_handler(this.paddle, this);
  }

  start() {
    if (
      this.game_state !== GAME_STATE.MENU &&
      this.game_state !== GAME_STATE.NEW_LEVEL
    )
      return;

    this.bricks = build_level(this, this.levels[this.current_level]);
    this.ball.reset();
    this.game_objects = [this.ball, this.paddle];

    this.game_state = GAME_STATE.RUNNING;
  }

  update(delta_time) {
    if (this.lives === 0) this.game_state = GAME_STATE.GAME_OVER;

    if (
      this.game_state === GAME_STATE.PAUSED ||
      this.game_state === GAME_STATE.MENU ||
      this.game_state === GAME_STATE.GAME_OVER
    )
      return;

    if (this.bricks.length === 0) {
      this.current_level++;
      this.game_state = GAME_STATE.NEW_LEVEL;
      this.start();
    }

    [...this.game_objects, ...this.bricks].forEach((object) =>
      object.update(delta_time)
    );

    this.bricks = this.bricks.filter((brick) => !brick.marked_for_deletion);
  }

  draw(ctx) {
    [...this.game_objects, ...this.bricks].forEach((object) =>
      object.draw(ctx)
    );

    if (this.game_state === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.game_width, this.game_height);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "gold";
      ctx.textAlign = "center";
      ctx.fillText("paused", this.game_width / 2, this.game_height / 2);
    }

    if (this.game_state === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.game_width, this.game_height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "gold";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACE BAR to Start",
        this.game_width / 2,
        this.game_height / 2
      );
    }

    if (this.game_state === GAME_STATE.GAME_OVER) {
      ctx.rect(0, 0, this.game_width, this.game_height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "gold";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER :(", this.game_width / 2, this.game_height / 2);
    }
  }

  toggle_pause() {
    if (this.game_state === GAME_STATE.PAUSED) {
      this.game_state = GAME_STATE.RUNNING;
    } else {
      this.game_state = GAME_STATE.PAUSED;
    }
  }
}

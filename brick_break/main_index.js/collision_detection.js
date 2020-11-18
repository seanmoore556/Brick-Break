export function detect_collision(ball, game_object) {
  // collision check (doesn't specify so we can use it everywhere)
  let bottom_of_ball = ball.position.y + ball.size;
  let top_of_ball = ball.position.y;

  let top_of_object = game_object.position.y;
  let left_side_of_object = game_object.position.x;
  let right_side_of_object = game_object.position.x + game_object.width;
  let bottom_of_object = game_object.position.y + game_object.height;

  if (
    bottom_of_ball >= top_of_object &&
    top_of_ball <= bottom_of_object &&
    ball.position.x + ball.size >= left_side_of_object &&
    ball.position.x + ball.size <= right_side_of_object
  ) {
    return true;
  } else {
    return false;
  }
}

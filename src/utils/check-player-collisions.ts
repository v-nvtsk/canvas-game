import { FIELD_HEIGHT, PLAYER_RADIUS } from "../constants";
import { isInCircle } from "./is-in-circle";

export function checkPlayerCollisions(player: { currPos: { x: number; y: number } }, mouse: { x: number; y: number }) {
  let hasCollision = false;

  // with wall
  if (player.currPos.y + PLAYER_RADIUS + 1 >= FIELD_HEIGHT || player.currPos.y - (PLAYER_RADIUS + 1) <= 0) {
    hasCollision = true;
  } else if (
    // with mouse pointer
    mouse.x >= 0 &&
    mouse.y >= 0 &&
    isInCircle(mouse.x, mouse.y, player.currPos.x, player.currPos.y, PLAYER_RADIUS)
  ) {
    hasCollision = true;
  }
  return hasCollision;
}

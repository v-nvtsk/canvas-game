import { BULLET_RADIUS, PLAYER_RADIUS } from "../constants";

export const checkIsPlayerWasShot = (player: { x: number; y: number }, bullet: { x: number; y: number }) => {
  const x1 = bullet.x;
  const y1 = bullet.y;
  const x2 = player.x;
  const y2 = player.y;

  const x = Math.abs(x1 - x2) ** 2;
  const y = Math.abs(y1 - y2) ** 2;

  return x + y <= (PLAYER_RADIUS + 1 + BULLET_RADIUS + 1) ** 2;
};

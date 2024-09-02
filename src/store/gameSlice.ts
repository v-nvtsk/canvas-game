/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { BULLET_RADIUS, FIELD_HEIGHT, FIELD_WIDTH, PLAYER_RADIUS } from "../constants";
import { checkIsPlayerWasShot, checkPlayerCollisions } from "../utils";

export type GameState = {
  players: {
    [key: string]: {
      count: number;
      speed: number;
      fireSpeed: number;
      currPos: { x: number; y: number };
      direction: -1 | 1;
      color?: string;
    };
  };
  bullets: {
    initiator: number;
    currPos: { x: number; y: number };
  }[];
  mouse: { x: number; y: number };
};

const initialState: GameState = {
  players: {
    1: {
      count: 0,
      speed: 1,
      fireSpeed: 1,
      currPos: { x: PLAYER_RADIUS + 1, y: FIELD_HEIGHT / 2 },
      direction: -1,
    },
    2: {
      count: 0,
      speed: 1,
      fireSpeed: 1,
      currPos: { x: FIELD_WIDTH - PLAYER_RADIUS - 1, y: FIELD_HEIGHT / 2 },
      direction: 1,
    },
  },
  bullets: [],
  mouse: { x: -1, y: -1 },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSpeed(state: GameState, action) {
      const { playerId, speed } = action.payload;
      state.players[playerId].speed = speed;
    },
    setFireSpeed(state: GameState, action) {
      const { playerId, fireSpeed } = action.payload;
      state.players[playerId].fireSpeed = fireSpeed;
    },
    fireBullet(state: GameState, action) {
      const { initiator } = action.payload;
      const direction = initiator === 1 ? 1 : -1;
      const currPos = {
        x: state.players[initiator].currPos.x + direction * (BULLET_RADIUS + PLAYER_RADIUS + 1 * 2),
        y: state.players[initiator].currPos.y,
      };
      state.bullets.push({ initiator, currPos });
    },
    setPlayerColor(state: GameState, action) {
      const { playerId, color } = action.payload;
      state.players[playerId].color = color;
    },
    hover(state: GameState, action) {
      state.mouse = action.payload;
    },
    unHover(state: GameState) {
      state.mouse = { x: -1, y: -1 };
    },
    tick(state: GameState) {
      state.bullets = state.bullets.reduce((bullets: typeof state.bullets, current) => {
        const direction = current.initiator === 1 ? 1 : -1;
        current.currPos = {
          x: current.currPos.x + direction,
          y: current.currPos.y,
        };
        // check collisions
        let hasCollision = false;
        //
        // with wall
        if (current.currPos.x + BULLET_RADIUS >= FIELD_WIDTH || current.currPos.x - BULLET_RADIUS <= 0)
          hasCollision = true;
        // with other player
        const hasPlayerFired = checkIsPlayerWasShot(
          (current.initiator === 1 ? state.players["2"] : state.players["1"]).currPos,
          current.currPos,
        );
        // on collision:
        // - increment player count if collision with player
        if (hasPlayerFired) {
          state.players[current.initiator].count += 1;
          hasCollision = true;
        }
        // - destroy bullet (don't add to array)
        // if no collision - add to array
        if (!hasCollision) bullets.push(current);
        return bullets;
      }, []);

      // check collisions
      //
      // with wall
      // with mouse position
      // on collision - change direction:

      // Player1
      if (checkPlayerCollisions(state.players["1"], state.mouse)) {
        state.players["1"].direction *= -1;
      }
      state.players["1"].currPos.y += state.players["1"].speed * state.players["1"].direction;

      // Player2
      if (checkPlayerCollisions(state.players["2"], state.mouse)) {
        state.players["2"].direction *= -1;
      }
      state.players["2"].currPos.y += state.players["2"].speed * state.players["2"].direction;
    },
  },
});

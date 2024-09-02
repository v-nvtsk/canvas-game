import { StoreRootState } from "..";

export const getGameState = (state: StoreRootState) => state.game;

export const getPlayers = (state: StoreRootState) => getGameState(state).players;

export const getBullets = (state: StoreRootState) => getGameState(state).bullets;

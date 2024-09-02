import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { GameState, gameSlice } from "./gameSlice";

export type StoreRootState = {
  game: GameState;
};

export const store = configureStore({
  reducer: combineReducers({
    game: gameSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

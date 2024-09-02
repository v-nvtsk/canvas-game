import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PLAYER_RADIUS } from "../constants";
import { isInCircle } from "../utils";

export function useMenu(player1: { x: number; y: number }, player2: { x: number; y: number }) {
  const [menuCoord, setMenuCoord] = useState<null | { left: number; top: number }>(null);
  const [playerIdForColorChange, setPlayerIdForColorChange] = useState<null | number>(null);
  const dispatch = useDispatch();

  const onColorChange = useCallback((color: string, playerId: number) => {
    dispatch({ type: "game/setPlayerColor", payload: { playerId, color } });
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      if (isInCircle(clickX, clickY, player1.x, player1.y, PLAYER_RADIUS)) {
        setPlayerIdForColorChange(1);
        setMenuCoord({ left: e.clientX, top: e.clientY });
      } else if (isInCircle(clickX, clickY, player2.x, player2.y, PLAYER_RADIUS)) {
        setPlayerIdForColorChange(2);
        setMenuCoord({ left: e.clientX, top: e.clientY });
      }
    },
    [player1, player2],
  );

  const hideMenu = useCallback(() => {
    setPlayerIdForColorChange(null);
    setMenuCoord(null);
  }, []);

  return { onClick, playerIdForColorChange, menuCoord, hideMenu, onColorChange };
}

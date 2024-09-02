import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BULLET_DELAY } from "../constants";
import { GameState } from "../store/gameSlice";

export function useSpeedInterval(isCanvasReady: boolean, player: GameState["players"][number], playerId: number) {
  const [fireSpeedInterval, setSpeedInterval] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCanvasReady) {
      if (fireSpeedInterval) clearInterval(fireSpeedInterval);

      setSpeedInterval(
        setInterval(() => {
          dispatch({ type: "game/fireBullet", payload: { initiator: playerId } });
        }, BULLET_DELAY / player.fireSpeed),
      );
    }
  }, [isCanvasReady, player.fireSpeed]);
}

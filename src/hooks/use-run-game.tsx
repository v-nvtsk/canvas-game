import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useRunGame(isCanvasReady: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCanvasReady) {
      setInterval(() => {
        requestAnimationFrame(() => {
          dispatch({ type: "game/tick" });
        });
      });
    }
  }, [isCanvasReady]);
}

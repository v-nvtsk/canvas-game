import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useMouseCollision() {
  const dispatch = useDispatch();

  const onHover = useCallback((e: null | React.MouseEvent<HTMLCanvasElement>) => {
    if (e === null) {
      dispatch({ type: "game/unHover" });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    dispatch({ type: "game/hover", payload: { x: e.clientX - rect.left, y: e.clientY - rect.top } });
  }, []);

  return { onHover };
}

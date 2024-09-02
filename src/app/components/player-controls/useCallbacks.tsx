import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

export function useCallbacks(playerId: number) {
  const dispatch = useDispatch<AppDispatch>();

  const callbacks = {
    onSpeedChange: (value: number): void => {
      dispatch({
        type: "game/setSpeed",
        payload: {
          playerId,
          speed: value,
        },
      });
    },
    onFireSpeedChange: (value: number): void => {
      dispatch({
        type: "game/setFireSpeed",
        payload: {
          playerId,
          fireSpeed: value,
        },
      });
    },
  };

  return callbacks;
}

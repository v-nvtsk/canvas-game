import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CustomCanvasElement } from "../app/components/canvas/canvas";
import { getBullets, getPlayers } from "../store/selectors/root-selectors";

export function useRedrawField(isCanvasReady: boolean, canvasRef: React.RefObject<CustomCanvasElement>) {
  const { "1": player1, "2": player2 } = useSelector(getPlayers);
  const bullets = useSelector(getBullets);

  useEffect(() => {
    if (isCanvasReady) {
      canvasRef.current!.clear();
      canvasRef.current!.drawPlayer(player1.currPos);
      canvasRef.current!.drawPlayer(player2.currPos);

      bullets.forEach((bullet) => {
        const color = bullet.initiator === 1 ? player1.color : player2.color;
        canvasRef.current!.drawBullet(bullet.currPos, color);
      });
    }
  }, [bullets, isCanvasReady, player1, player2]);
}

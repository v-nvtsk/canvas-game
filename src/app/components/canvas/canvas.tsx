import { forwardRef, MouseEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BULLET_RADIUS, FIELD_HEIGHT, FIELD_WIDTH, PLAYER_RADIUS } from "../../../constants";
import style from "./style.module.css";

export interface CustomCanvasElement extends HTMLCanvasElement {
  clear: () => void;
  drawPlayer(coord: { x: number; y: number }): void;
  drawBullet(coord: { x: number; y: number }, color?: string): void;
}

type CanvasProps = {
  onReady: () => void;
  onClick: MouseEventHandler<HTMLCanvasElement>;
  onHover: (e: null | React.MouseEvent<HTMLCanvasElement>) => void;
};

const Canvas = forwardRef(({ onHover, onReady, onClick }: CanvasProps, ref) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      ctx?.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
    },
    drawPlayer(currCoord: { x: number; y: number }) {
      if (ctx === null) return;

      ctx.beginPath();
      ctx.arc(currCoord.x, currCoord.y, PLAYER_RADIUS, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    },
    drawBullet(currCoord: { x: number; y: number }, color: string = "#000") {
      if (ctx === null) return;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(currCoord.x, currCoord.y, BULLET_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },
  }));

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      setCtx(context);
      onReady();
    }
  }, []);

  return (
    <div className={style.canvasContainer}>
      <canvas
        className={style.canvas}
        ref={canvasRef}
        width={FIELD_WIDTH}
        height={FIELD_HEIGHT}
        onContextMenu={onClick}
        onMouseMove={onHover}
        onMouseLeave={() => onHover(null)}
      ></canvas>
    </div>
  );
});

export default Canvas;

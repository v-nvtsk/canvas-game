import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMenu, useMouseCollision, useRedrawField, useRunGame, useSpeedInterval } from "../hooks";
import { getPlayers } from "../store/selectors/root-selectors";
import Canvas, { CustomCanvasElement } from "./components/canvas/canvas";
import { Display } from "./components/display";
import { Menu } from "./components/menu";
import { PlayerControls } from "./components/player-controls";
import style from "./style.module.css";

function App() {
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const { 1: player1, 2: player2 } = useSelector(getPlayers);

  const canvasRef = useRef<CustomCanvasElement>(null);

  useRunGame(isCanvasReady);

  useSpeedInterval(isCanvasReady, player1, 1);
  useSpeedInterval(isCanvasReady, player2, 2);

  useRedrawField(isCanvasReady, canvasRef);

  const { onClick, playerIdForColorChange, menuCoord, hideMenu, onColorChange } = useMenu(
    player1.currPos,
    player2.currPos,
  );

  const { onHover } = useMouseCollision();

  return (
    <div className={style.container}>
      <div className={style.flex}>
        <PlayerControls playerId={1} />
        <Display count1={player1.count} count2={player2.count} />
        <PlayerControls playerId={2} />
      </div>

      <Canvas ref={canvasRef} onReady={() => setIsCanvasReady(true)} onHover={onHover} onClick={onClick} />
      {menuCoord && playerIdForColorChange && (
        <Menu
          left={menuCoord.left}
          top={menuCoord.top}
          onLeave={hideMenu}
          onColorChange={onColorChange}
          playerId={playerIdForColorChange}
        />
      )}
    </div>
  );
}

export default App;

import { RangeInput } from "../range-input";
import { useCallbacks } from "./useCallbacks";

export function PlayerControls({ playerId }: { playerId: number }) {
  const { onFireSpeedChange, onSpeedChange } = useCallbacks(playerId);

  return (
    <div>
      <h2>Player {playerId}</h2>
      <RangeInput labelName="Moving speed" onChange={onSpeedChange} />
      <RangeInput labelName="Fire speed" onChange={onFireSpeedChange} />
    </div>
  );
}

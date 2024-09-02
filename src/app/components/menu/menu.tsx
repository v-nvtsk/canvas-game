import style from "./style.module.css";

type MenuProps = {
  left: number;
  top: number;
  onLeave: () => void;
  onColorChange: (color: string, playerId: number) => void;
  playerId: number;
};

export function Menu({ left, top, onLeave, onColorChange, playerId }: MenuProps) {
  const colors = ["black", "red", "green", "blue", "yellow", "orange", "purple", "pink"];
  const items = colors.map((color) => (
    <li key={color} className={style.menuItem} onClick={() => onColorChange(color, playerId)}>
      {color}
    </li>
  ));

  return (
    <div className={style.menu} onClick={onLeave} onContextMenu={(e) => e.preventDefault()}>
      <ul className={style.menuList} style={{ left, top }}>
        {items}
      </ul>
    </div>
  );
}

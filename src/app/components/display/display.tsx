import style from "./style.module.css";

export function Display({ count1, count2 }: { count1: number; count2: number }) {
  return (
    <div className={style.display}>
      <span>{count1}</span> : <span>{count2}</span>
    </div>
  );
}

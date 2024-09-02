export function isInCircle(x: number, y: number, cx: number, cy: number, radius: number) {
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

export function isPointInCircleInBox(
  point1: {x: number; y: number},
  box: {x: number; y: number; width: number; height: number},
  circle: {x: number; y: number; radius: number},
): boolean {
  const {x: bx, y: by, width: bw, height: bh} = box;
  const {x: cx, y: cy, radius: cr} = circle;
  const {x: p1x, y: p1y} = point1;

  const isCircleInBox =
    cx - cr >= bx && cx + cr <= bx + bw && cy - cr >= by && cy + cr <= by + bh;

  if (!isCircleInBox) {
    return false;
  }

  const isPointInCircle: (px: number, py: number) => boolean = (
    px: number,
    py: number,
  ) => {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= cr * cr;
  };

  return isPointInCircle(p1x, p1y);
}

export const BALL_DIAMETER = 100;

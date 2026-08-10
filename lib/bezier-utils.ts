type BezierTuple = [number, number, number, number];

function cubicBezierPoint(t: number, [, p2, p3]: BezierTuple): number {
  const u = 1 - t;
  return 3 * u * u * t * p2 + 3 * u * t * t * p3 + t * t * t;
}

export function getTimeForProgress(
  progress: number,
  bezier: BezierTuple,
  tolerance = 0.001,
): number {
  const target = Math.max(0, Math.min(1, progress));
  if (target <= 0) return 0;
  if (target >= 1) return 1;

  let low = 0;
  let high = 1;

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const value = cubicBezierPoint(mid, bezier);
    if (Math.abs(value - target) < tolerance) return mid;
    if (value < target) low = mid;
    else high = mid;
  }

  return (low + high) / 2;
}

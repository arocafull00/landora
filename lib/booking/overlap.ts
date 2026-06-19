export type TimeInterval = {
  startsAt: Date;
  endsAt: Date;
};

export function intervalsOverlap(a: TimeInterval, b: TimeInterval) {
  return a.startsAt < b.endsAt && a.endsAt > b.startsAt;
}

export function slotOverlapsAny(
  slot: TimeInterval,
  blockers: TimeInterval[],
) {
  for (const blocker of blockers) {
    if (intervalsOverlap(slot, blocker)) {
      return true;
    }
  }
  return false;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

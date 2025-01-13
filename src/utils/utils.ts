export function dateFromExpiresAt(timestamp: number | null | undefined): string {
  if (timestamp === null || timestamp === undefined) {
    return "Invalid Date";
  }
  return new Date(timestamp * 1000).toDateString();
}

export function isValidDuration(duration: number) {
  return (duration > 0 && duration < 2147483647)
}

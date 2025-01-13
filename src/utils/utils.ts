export function isValidDate(timestamp: number | null | undefined): boolean {
  if (!timestamp) return false;
  return timestamp > 0 && timestamp < 2147483647;
}

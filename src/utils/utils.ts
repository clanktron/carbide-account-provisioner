export const daysTillExpiryMessage = 'The expiration time(in days and the starting point is creation time) of the token of the robot account. For being never expired, please enter "-1".'

export function sanitizeRobotName(name: string | null | undefined): string {
  if (!name) {
    return 'Undefined'
  }
  return name.replace(/^robot\$/, '')
}

export function dateFromExpiresAt(timestamp: number | null | undefined): string {
  if (timestamp === null || timestamp === undefined) {
    return "Invalid Date";
  }
  return new Date(timestamp * 1000).toDateString();
}

export function isValidDuration(duration: number) {
  return (duration > 0 && duration < 2147483647)
}

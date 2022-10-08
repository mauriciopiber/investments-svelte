export function isNumber(value: number) {
  if (isNaN(value)) {
    return false;
  }

  if (!Number.isFinite(value)) {
    return false;
  }

  if (typeof value !== "number") {
    return false;
  }

  return true;
}

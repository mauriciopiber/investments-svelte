export function decodedNumber(value: string): number {
  if (value === "") {
    return 0;
  }
  const values = value
    .split(",")
    .map((value) => value.replace(/\./g, ""))
    .join(".");

  // console.log(values);
  return parseFloat(values);
}

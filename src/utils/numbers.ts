export function round(input: number, decimal = 0): number {
  return Math.round(input * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

const isNumber = (val: number | undefined): val is number => {
  return val !== undefined
}

export const average = (...prices: (number | undefined)[]): number | undefined => {
  const numbers = prices.filter(isNumber)
  return numbers.length ? numbers.reduce((sum, n) => sum + n, 0) / numbers.length : undefined
}

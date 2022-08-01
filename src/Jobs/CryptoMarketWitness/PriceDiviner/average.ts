import { AssetInfo, XyoCryptoMarketAssetPayload } from '../../../Model'

const isNumber = (val: number | undefined): val is number => {
  return val !== undefined
}

const parseStringifiedNumber = (value: string): number | undefined => {
  const parsed = parseFloat(value)
  return isNaN(parsed) ? undefined : parsed
}

const averageStringifiedNumbers = (...prices: string[]): number | undefined => {
  const numbers = prices.map(parseStringifiedNumber).filter(isNumber)
  return numbers.length ? numbers.reduce((sum, n) => sum + n, 0) / numbers.length : undefined
}

export const average = (...payloads: XyoCryptoMarketAssetPayload[]): Record<string, AssetInfo> => {
  const assets = new Set(payloads.map((payload) => Object.keys(payload.assets)).flatMap((asset) => asset))
  throw ''
}

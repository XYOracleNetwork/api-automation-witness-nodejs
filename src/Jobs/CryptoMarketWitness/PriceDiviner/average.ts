import { exists } from '@xylabs/sdk-js'

import { AssetInfo, Currency, Token, XyoCryptoMarketAssetPayload } from '../../../Model'

const isNumber = (val: number | undefined): val is number => {
  return val !== undefined
}

const parseStringifiedNumber = (value: string | undefined): number | undefined => {
  if (!value) return undefined
  const parsed = parseFloat(value)
  return isNaN(parsed) ? undefined : parsed
}

const averageStringifiedNumbers = (...prices: string[] | undefined[]): number | undefined => {
  const numbers = prices.map(parseStringifiedNumber).filter(isNumber)
  return numbers.length ? numbers.reduce((sum, n) => sum + n, 0) / numbers.length : undefined
}

export const average = (...payloads: XyoCryptoMarketAssetPayload[]): Record<string, AssetInfo> => {
  const assets = new Set<Token>(payloads.map((payload) => Object.keys(payload.assets).map<Token>((k) => k as Token)).flatMap((asset) => asset))
  const tokens = assets.forEach((asset) => {
    const valuations = payloads.map((p) => p.assets?.[asset]).filter(exists)
    const symbols = new Set<Currency | Token>(
      valuations
        .map((v) => Object.keys(v.value) as unknown as Currency | Token)
        .flatMap((v) => v)
        .filter(exists)
    )
  })
  throw ''
}

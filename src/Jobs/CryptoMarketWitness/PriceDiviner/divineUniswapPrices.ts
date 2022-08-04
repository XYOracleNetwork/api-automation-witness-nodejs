import { exists } from '@xylabs/sdk-js'
import { PartialRecord, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { AssetInfo, Currency, Token, ValueBasis, XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'

const schema = xyoCryptoMarketAssetSchema

const mapUniswapToken = (symbol: string): Token | Currency => {
  // TODO: Actually calculate the value of the token/stablecoin based on others
  // to weed out individual fluctuations in price
  if (symbol.toLowerCase() === 'wbtc') return 'btc'
  if (symbol.toLowerCase() === 'weth') return 'eth'
  if (symbol.toLowerCase() === 'usdt') return 'usd'
  return symbol.toLowerCase() as Token
}

export const divineUniswapPrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined): XyoCryptoMarketAssetPayload => {
  let assets: PartialRecord<Token, AssetInfo | undefined> = {}
  if (uniswapPayload) {
    const tokens: Set<Token> = new Set(
      uniswapPayload?.pairs
        .map((p) => p.tokens)
        .flatMap((t) => t)
        .map((t) => t.symbol.toLowerCase() as Token)
    )
    assets = Object.fromEntries(
      [...tokens].map((token) => {
        const pairsContainingToken = uniswapPayload?.pairs
          .map((p) => p.tokens)
          .filter((p) => p.some((x) => x.symbol.toLowerCase() === token))
          .filter(exists)
        const value: ValueBasis = Object.fromEntries(
          pairsContainingToken
            .map((pair) => {
              const current = pair.filter((p) => p.symbol.toLowerCase() === token)?.[0]
              const other = pair.filter((p) => p.symbol.toLowerCase() !== token)?.[0]
              return [other.symbol.toLowerCase(), current.value.toString()]
            })
            .map((x) => [mapUniswapToken(x[0]), x[1]])
        )
        const assetInfo: AssetInfo = { value }
        return [token, assetInfo]
      })
    )
  }
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema }).fields({ assets, timestamp }).build()
}

import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { Assets } from './Assets'
import { averagePrices } from './averagePrices'

const schema = 'network.xyo.crypto.asset'

const divineCoinGeckoPrices = (coingeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined) => coingeckoPayload?.assets?.xyo?.usd

const divineUniswapPrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined) =>
  uniswapPayload?.pairs
    .map((p) => p.tokens)
    .filter((t) => t.some((t) => t.symbol === 'xyo'))
    ?.find((t) => t.some((t) => t.symbol === 'usdt'))
    ?.find((t) => t.symbol === 'xyo')?.value

export const divinePrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined, coinGeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined): XyoPayload => {
  const coinGeckoPrices = divineCoinGeckoPrices(coinGeckoPayload)
  const uniswapPrices = divineUniswapPrices(uniswapPayload)
  const fields: Assets = {}
  if (coinGeckoPrices || uniswapPrices) {
    const usd = averagePrices(coinGeckoPrices, uniswapPrices)?.toString()
    fields.xyo = { value: { usd } }
  }
  return new XyoPayloadBuilder({ schema }).fields(fields).build()
}

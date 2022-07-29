import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { Assets } from './Assets'
import { averagePrices } from './averagePrices'

const schema = 'network.xyo.crypto.asset'

export const calculatePrice = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined, coingeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined): XyoPayload => {
  const xyoUsd = coingeckoPayload?.assets?.xyo?.usd
  const xyoUsdt = uniswapPayload?.pairs
    .map((p) => p.tokens)
    .filter((t) => t.some((t) => t.symbol === 'xyo'))
    ?.find((t) => t.some((t) => t.symbol === 'usdt'))
    ?.find((t) => t.symbol === 'xyo')?.value
  const fields: Assets = {}
  if (xyoUsd || xyoUsdt) {
    const usd = averagePrices(xyoUsd, xyoUsdt)?.toString()
    fields.xyo = { value: { usd } }
  }
  return new XyoPayloadBuilder({ schema }).fields(fields).build()
}

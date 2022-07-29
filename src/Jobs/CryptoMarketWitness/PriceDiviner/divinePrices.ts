import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { Assets } from '../../../Model'
import { average } from './average'
import { divineCoinGeckoPrices } from './divineCoinGeckoPrices'
import { divineUniswapPrices } from './divineUniswapPrices'

const schema = 'network.xyo.crypto.asset'

export const divinePrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined, coinGeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined): XyoPayload => {
  const coinGeckoPrices = divineCoinGeckoPrices(coinGeckoPayload)
  const uniswapPrices = divineUniswapPrices(uniswapPayload)
  const assets: Assets = {}
  if (coinGeckoPrices || uniswapPrices) {
    const usd = average(coinGeckoPrices, uniswapPrices)?.toString()
    assets.xyo = { value: { usd } }
  }
  const timestamp = Date.now()
  return new XyoPayloadBuilder({ schema }).fields({ assets, timestamp }).build()
}

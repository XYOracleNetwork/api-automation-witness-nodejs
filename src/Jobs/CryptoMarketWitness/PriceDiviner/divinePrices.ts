import { exists } from '@xylabs/sdk-js'
import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'
import { average } from './average'
import { divineCoinGeckoPrices } from './divineCoinGeckoPrices'
import { divineUniswapPrices } from './divineUniswapPrices'

export const divinePrices = (
  coinGeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined,
  uniswapPayload: XyoCryptoMarketUniswapPayload | undefined
): XyoCryptoMarketAssetPayload => {
  const coinGeckoPrices = divineCoinGeckoPrices(coinGeckoPayload)
  const uniswapPrices = divineUniswapPrices(uniswapPayload)
  const prices = [uniswapPayload, coinGeckoPayload].some(exists)
  const assets = prices ? average(coinGeckoPrices, uniswapPrices) : {}
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema: xyoCryptoMarketAssetSchema }).fields({ assets, timestamp }).build()
}

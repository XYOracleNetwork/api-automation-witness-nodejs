import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { AssetInfo, XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'
import { average } from './average'
import { divineCoinGeckoPrices } from './divineCoinGeckoPrices'
import { divineUniswapPrices } from './divineUniswapPrices'

export const divinePrices = (
  uniswapPayload: XyoCryptoMarketUniswapPayload | undefined,
  coinGeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined
): XyoCryptoMarketAssetPayload => {
  const coinGeckoPrices = divineCoinGeckoPrices(coinGeckoPayload)
  const uniswapPrices = divineUniswapPrices(uniswapPayload)
  const assets: Record<string, AssetInfo> = {}
  if (coinGeckoPrices || uniswapPrices) {
    const usd = average(coinGeckoPrices, uniswapPrices)?.toString()
    assets.xyo = { value: { usd } }
  }
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema: xyoCryptoMarketAssetSchema }).fields({ assets, timestamp }).build()
}

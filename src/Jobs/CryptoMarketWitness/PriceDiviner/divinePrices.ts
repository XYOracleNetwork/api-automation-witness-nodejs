import { exists } from '@xylabs/sdk-js'
import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'
import { XyoUniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'
import { average } from './average'
import { divineCoinGeckoPrices } from './divineCoinGeckoPrices'
import { divineUniswapPrices } from './divineUniswapPrices'

export const divinePrices = (
  coinGeckoPayload: XyoCoingeckoCryptoMarketPayload | undefined,
  uniswapPayload: XyoUniswapCryptoMarketPayload | undefined
): XyoCryptoMarketAssetPayload => {
  const coinGeckoPrices = divineCoinGeckoPrices(coinGeckoPayload)
  const uniswapPrices = divineUniswapPrices(uniswapPayload)
  const prices = [uniswapPayload, coinGeckoPayload].some(exists)
  const assets = prices ? average(coinGeckoPrices, uniswapPrices) : {}
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema: xyoCryptoMarketAssetSchema }).fields({ assets, timestamp }).build()
}

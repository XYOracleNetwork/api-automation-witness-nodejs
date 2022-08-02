import { PartialRecord, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { AssetInfo, Token, XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'

const schema = xyoCryptoMarketAssetSchema

export const divineUniswapPrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined): XyoCryptoMarketAssetPayload => {
  const assets: PartialRecord<Token, AssetInfo | undefined> = { xyo: { value: { usd: undefined } } }
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema }).fields({ assets, timestamp }).build()
}

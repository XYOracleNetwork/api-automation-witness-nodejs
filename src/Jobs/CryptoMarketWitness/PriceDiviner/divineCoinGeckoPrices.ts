import { PartialRecord, XyoCryptoMarketCoinGeckoPayload } from '@xyo-network/cryptomarket-witness'
import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { AssetInfo, XyoCryptoMarketAssetPayload, xyoCryptoMarketAssetSchema } from '../../../Model'

const schema = xyoCryptoMarketAssetSchema

const valuationExists = (value: [string, PartialRecord<string, number> | undefined]): value is [string, PartialRecord<string, number>] => {
  return !!value[1]
}

const otherValueExists = (value: [string, number | undefined]): value is [string, number] => {
  const possiblyNumber = value[1]
  return typeof possiblyNumber === 'number' && !isNaN(possiblyNumber)
}

export const divineCoinGeckoPrices = (payload: XyoCryptoMarketCoinGeckoPayload | undefined): XyoCryptoMarketAssetPayload => {
  const assets: Record<string, AssetInfo> =
    payload && payload?.assets
      ? Object.fromEntries(
          Object.entries(payload.assets)
            .filter(valuationExists)
            .map(([asset, valuation]) => {
              const value = Object.fromEntries(
                Object.entries(valuation)
                  .filter(otherValueExists)
                  .map(([symbol, price]) => [symbol, price?.toString()])
              )
              return [asset, { value }]
            })
        )
      : {}
  const timestamp = Date.now()
  return new XyoPayloadBuilder<XyoCryptoMarketAssetPayload>({ schema }).fields({ assets, timestamp }).build()
}

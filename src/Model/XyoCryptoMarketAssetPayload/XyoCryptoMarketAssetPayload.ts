import { PartialRecord, XyoPayload, XyoQueryPayload } from '@xyo-network/sdk-xyo-client-js'

import { AssetInfo } from './AssetInfo'
import { Token } from './Token'

export const xyoCryptoMarketAssetSchema = 'network.xyo.crypto.asset'
export type XyoCryptoMarketAssetSchema = 'network.xyo.crypto.asset'

export const xyoCryptoMarketAssetQuerySchema = 'network.xyo.crypto.asset.query'
export type XyoCryptoMarketAssetQuerySchema = 'network.xyo.crypto.asset.query'

export type XyoCryptoMarketAssetQueryPayload = XyoQueryPayload<{
  schema: XyoCryptoMarketAssetQuerySchema
}>

export interface XyoCryptoMarketAssetPayload extends XyoPayload {
  assets: PartialRecord<Token, AssetInfo | undefined>
  schema: XyoCryptoMarketAssetSchema
  timestamp: number
}

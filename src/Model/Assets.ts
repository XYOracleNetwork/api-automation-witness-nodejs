import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

export interface ValueBasis {
  usd?: string
}
export interface AssetValue {
  value?: ValueBasis
}
export interface Assets extends Record<string, AssetValue | undefined> {
  xyo?: AssetValue
}

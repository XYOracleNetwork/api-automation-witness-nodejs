import { XyoCryptoMarketAssetDiviner, XyoCryptoMarketAssetDivinerConfigSchema } from '@xyo-network/crypto-asset-payload-plugin'

export const getCryptoMarketAssetDiviner = (): XyoCryptoMarketAssetDiviner => {
  return new XyoCryptoMarketAssetDiviner({
    schema: XyoCryptoMarketAssetDivinerConfigSchema,
  })
}

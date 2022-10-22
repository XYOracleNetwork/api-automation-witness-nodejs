import { XyoCryptoMarketAssetDiviner, XyoCryptoMarketAssetDivinerConfigSchema } from '@xyo-network/crypto-asset-payload-plugin'

export const getCryptoMarketAssetDiviner = async (): Promise<XyoCryptoMarketAssetDiviner> => {
  return await XyoCryptoMarketAssetDiviner.create({
    config: {
      schema: XyoCryptoMarketAssetDivinerConfigSchema,
    },
  })
}

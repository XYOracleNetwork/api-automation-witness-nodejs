import { XyoCryptoMarketAssetDiviner, XyoCryptoMarketAssetDivinerConfigSchema } from '@xyo-network/crypto-asset-payload-plugin'

import { getSigningAccount } from '../../Account'

export const getCryptoMarketAssetDiviner = async (): Promise<XyoCryptoMarketAssetDiviner> => {
  const account = getSigningAccount()
  return await XyoCryptoMarketAssetDiviner.create({
    account,
    config: {
      schema: XyoCryptoMarketAssetDivinerConfigSchema,
    },
  })
}

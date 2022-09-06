import { XyoCryptoMarketAssetDiviner, XyoCryptoMarketAssetDivinerConfigSchema } from '@xyo-network/crypto-asset-payload-plugin'

import { getSigningAccount } from '../../Archivists'

export const getCryptoMarketAssetDiviner = (): XyoCryptoMarketAssetDiviner => {
  const account = getSigningAccount()
  return new XyoCryptoMarketAssetDiviner({
    account,
    schema: XyoCryptoMarketAssetDivinerConfigSchema,
  })
}

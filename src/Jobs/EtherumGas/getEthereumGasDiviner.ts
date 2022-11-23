import { XyoEthereumGasDiviner, XyoEthereumGasDivinerConfigSchema } from '@xyo-network/gas-price-payload-plugin'

import { getAccount } from '../../Account'

export const getEthereumGasDiviner = async (): Promise<XyoEthereumGasDiviner> => {
  return await XyoEthereumGasDiviner.create({
    account: getAccount(),
    config: {
      schema: XyoEthereumGasDivinerConfigSchema,
    },
  })
}

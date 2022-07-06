import { getDefaultProvider, Provider } from '@ethersproject/providers'

import { ProviderOptions } from '../Model'
import { canUseAlchemyProvider, getAlchemyProviderConfig } from './getAlchemyProvider'
import { canUseEtherscanProvider, getEtherscanProviderConfig } from './getEtherscanProvider'
import { canUseInfuraProvider, getInfuraProviderConfig } from './getInfuraProvider'
import { canUsePocketProvider, getPocketProviderConfig } from './getPocketProvider'
import { providerOmitted } from './ProviderOmitted'

export const getProvider = (): Provider => {
  const provider = getDefaultProvider('homestead', getProviderOptions())
  return provider
}

const getProviderOptions = (): ProviderOptions => {
  const alchemy = canUseAlchemyProvider() ? getAlchemyProviderConfig() : providerOmitted
  const etherscan = canUseEtherscanProvider() ? getEtherscanProviderConfig() : providerOmitted
  const infura = canUseInfuraProvider() ? getInfuraProviderConfig() : providerOmitted
  const pocket = canUsePocketProvider() ? getPocketProviderConfig() : providerOmitted
  return { alchemy, etherscan, infura, pocket }
}

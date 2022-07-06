import { getDefaultProvider, Provider } from '@ethersproject/providers'

import { canUseAlchemyProvider, getAlchemyProviderConfig } from './getAlchemyProvider'
import { canUseInfuraProvider, getInfuraProvider, getInfuraProviderConfig } from './getInfuraProvider'
import { providerOmitted } from './ProviderOmitted'

export const getProvider = (): Provider => {
  const provider = canUseInfuraProvider() ? getInfuraProvider() : getFallbackProvider()
  return provider
}

const getFallbackProvider = (): Provider => {
  const infura = canUseInfuraProvider() ? getInfuraProviderConfig() : providerOmitted
  const alchemy = canUseAlchemyProvider() ? getAlchemyProviderConfig() : providerOmitted
  const provider = getDefaultProvider('homestead', { alchemy, infura })
  return provider
}

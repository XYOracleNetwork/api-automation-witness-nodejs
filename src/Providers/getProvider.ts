import { getDefaultProvider, Provider } from '@ethersproject/providers'

import { canUseProvider, getInfuraProvider, getProviderConfig } from './getInfuraProvider'
import { providerOmitted } from './ProviderOmitted'

export const getProvider = (useFallbackProvider = false): Provider => {
  const provider = useFallbackProvider ? getFallbackProvider() : getInfuraProvider()
  return provider
}

const getFallbackProvider = (): Provider => {
  const infura = canUseProvider() ? getProviderConfig() : providerOmitted
  const provider = getDefaultProvider('homestead', { infura })
  return provider
}

import { getDefaultProvider, Provider } from '@ethersproject/providers'

import { defaultPollingIntervalMs } from './DefaultPollingInterval'
import { canUseProvider, getInfuraProvider, getProviderConfig } from './getInfuraProvider'

// From the ether's docs
// https://docs.ethers.io/v5/api-keys/#api-keys--getDefaultProvider
const providerOmitted = '-'

const useFallbackProvider = true

export const getProvider = (): Provider => {
  const provider = useFallbackProvider ? getFallbackProvider() : getInfuraProvider()
  return provider
}

const getFallbackProvider = (pollingInterval = defaultPollingIntervalMs): Provider => {
  const infura = canUseProvider() ? getProviderConfig() : providerOmitted
  const provider = getDefaultProvider('homestead', { infura })
  provider.pollingInterval = pollingInterval
  return provider
}

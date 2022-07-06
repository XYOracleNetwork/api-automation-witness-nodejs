import { getDefaultProvider, Provider } from '@ethersproject/providers'

import { canUseAlchemyProvider, getAlchemyProviderConfig } from './getAlchemyProvider'
import { canUseEtherscanProvider, getEtherscanProviderConfig } from './getEtherscanProvider'
import { canUseInfuraProvider, getInfuraProviderConfig } from './getInfuraProvider'
import { providerOmitted } from './ProviderOmitted'

export interface ProviderOptions {
  alchemy?: string // Alchemy API Token
  etherscan?: string // Etherscan API Token
  infura?: string | { projectId: string; projectSecret: string } // INFURA Project ID or { projectId, projectSecret }
  pocket?: string | { applicationId: string; applicationSecretKey: string } // Pocket Network Application ID or { applicationId, applicationSecretKey }
  quorum?: number // The number of backends that must agree (default: 2 for mainnet, 1 for testnets)
}

export const getProvider = (): Provider => {
  const provider = getFallbackProvider()
  return provider
}

const getFallbackProvider = (): Provider => {
  const alchemy = canUseAlchemyProvider() ? getAlchemyProviderConfig() : providerOmitted
  const etherscan = canUseEtherscanProvider() ? getEtherscanProviderConfig() : providerOmitted
  const infura = canUseInfuraProvider() ? getInfuraProviderConfig() : providerOmitted
  const options: ProviderOptions = { alchemy, etherscan, infura }
  const provider = getDefaultProvider('homestead', options)
  return provider
}

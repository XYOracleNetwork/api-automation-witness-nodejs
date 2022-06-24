import { Provider } from '@ethersproject/providers'

import { getInfuraProvider } from './getInfuraProvider'

export const getProvider = (): Provider => {
  return getInfuraProvider()
}

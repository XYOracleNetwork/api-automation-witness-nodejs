import { Provider } from '@ethersproject/providers'

import { getInfuraProvider } from './getInfuraProvider'

export const getDefaultProvider = (): Provider => {
  return getInfuraProvider()
}

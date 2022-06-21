import { InfuraProvider, Provider } from '@ethersproject/providers'

export const getInfuraProvider = (): Provider => {
  return new InfuraProvider()
}

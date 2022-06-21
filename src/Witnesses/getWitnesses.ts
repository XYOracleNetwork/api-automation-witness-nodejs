import { getDefaultProvider } from '@ethersproject/providers'

import { getCryptoMarketWitness } from './getCryptoMarketWitness'
import { WitnessProvider } from './WitnessProvider'

export const getWitnesses: WitnessProvider<unknown> = (_opts: unknown) => {
  const cryptoMarketWitness = getCryptoMarketWitness(getDefaultProvider())
  return [...cryptoMarketWitness]
}
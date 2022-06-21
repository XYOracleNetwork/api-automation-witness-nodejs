import { getDefaultProvider } from '@ethersproject/providers'

import { getCryptoMarketWitness } from './getCryptoMarketWitness'
import { WitnessProvider } from './WitnessProvider'

export const getWitnesses: WitnessProvider<unknown> = async (opts: unknown) => {
  const cryptoMarketWitness = await getCryptoMarketWitness(getDefaultProvider())
  return [...cryptoMarketWitness]
}

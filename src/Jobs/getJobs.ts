import { Job } from '../Model'
import { getJob as getCryptoMarketWitnessJob } from './CryptoMarketWitness'
import { getJob as getEthereumGasJob } from './EthereumGas'

export const getJobs = (): Job[] => {
  return [getCryptoMarketWitnessJob(), getEthereumGasJob()]
}

import { Job } from '../Model'
import { getJob as getCryptoMarketWitnessJob } from './CryptoMarketWitness'

export const getJobs = (): Job[] => {
  return [getCryptoMarketWitnessJob()]
}

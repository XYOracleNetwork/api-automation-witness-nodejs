import { Job } from '../Model'
import { getCryptoMarketWitnessJob } from './getCryptoMarketWitnessJob'

export const getJobs = (): Job[] => {
  return [getCryptoMarketWitnessJob()]
}

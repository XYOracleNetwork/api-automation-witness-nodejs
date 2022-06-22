import { CronJob } from 'cron'

import { Job } from '../Model'
import { storeObservation } from '../Network'
import { getCryptoMarketWitness } from '../Witnesses'

const cryptoMarketWitnessJob = new CronJob(
  // '* * * * * *', // every second
  '* * * * *', // every minute
  async () => {
    const witnesses = getCryptoMarketWitness()
    const observations = await Promise.all(witnesses.map((w) => w.observe()))
    await Promise.all(observations.map((observation) => storeObservation(observation)))
  },
  null,
  true,
  'America/Los_Angeles'
)

export const getCryptoMarketWitnessJob = (): Job => {
  return cryptoMarketWitnessJob
}

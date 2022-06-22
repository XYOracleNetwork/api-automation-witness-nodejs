import { CronJob } from 'cron'

import { Job } from '../Model'
// import { storeObservation } from '../Network'
import { getCryptoMarketWitness } from '../Witnesses'

const testJob = new CronJob(
  // '* * * * * *', // every second
  '* * * * *', // every minute
  async () => {
    const witnesses = getCryptoMarketWitness()
    const observations = await Promise.all(witnesses.map((w) => w.observe()))
    // const storageResults = await Promise.all(observations.map((observation) => storeObservation(observation)))
    console.log(observations)
  },
  null,
  true,
  'America/Los_Angeles'
)

export const getCryptoMarketWitnessJob = (): Job => {
  return testJob
}

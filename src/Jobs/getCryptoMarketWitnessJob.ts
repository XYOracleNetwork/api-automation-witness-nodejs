import { CronJob } from 'cron'

import { Job } from '../Model'
import { storeObservation } from '../Network'
import { getCryptoMarketWitness } from '../Witnesses'
import { everyMinute } from './CronSchedules'

const schedule = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || everyMinute

const cryptoMarketWitnessJob = new CronJob(
  schedule,
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

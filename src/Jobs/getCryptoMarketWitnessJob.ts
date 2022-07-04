import { CronJob } from 'cron'

import { Job } from '../Model'
import { getCryptoMarketPanel } from '../Panels'
import { everyMinute } from './CronSchedules'

export const cryptoMarketWitnessJobSchedule = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || everyMinute

export const getCryptoMarketWitnessJob = (schedule = cryptoMarketWitnessJobSchedule): Job => {
  const cryptoMarketWitnessJob = new CronJob(
    schedule,
    async () => {
      console.log(`[${new Date()}] Witnessing Crypto Prices`)
      await getCryptoMarketPanel().report()
    },
    null,
    true,
    'America/Los_Angeles'
  )
  return cryptoMarketWitnessJob
}

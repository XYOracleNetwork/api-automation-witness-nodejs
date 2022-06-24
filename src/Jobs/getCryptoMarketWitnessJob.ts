import { CronJob } from 'cron'

import { Job } from '../Model'
import { getCryptoMarketPanel } from '../Panels'
import { everyTenMinutes } from './CronSchedules'

// const schedule = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || everyMinute

const cryptoMarketWitnessJob = new CronJob(
  everyTenMinutes,
  async () => {
    console.log(`[${new Date()}] Witnessing Crypto Prices`)
    await getCryptoMarketPanel().report()
  },
  null,
  true,
  'America/Los_Angeles'
)

export const getCryptoMarketWitnessJob = (): Job => {
  return cryptoMarketWitnessJob
}

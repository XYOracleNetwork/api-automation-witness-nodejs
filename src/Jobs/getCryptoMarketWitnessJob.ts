import { CronJob } from 'cron'

import { Job } from '../Model'
import { getCryptoMarketPanel } from '../Panels'
import { getProvider } from '../Providers'
import { everyMinute } from './CronSchedules'

export const getCryptoMarketWitnessJob = (schedule?: string): Job => {
  const cryptoMarketWitnessJobSchedule = schedule || process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || everyMinute
  const cryptoMarketWitnessJob = new CronJob(
    cryptoMarketWitnessJobSchedule,
    async () => {
      let blockNumber = -1
      try {
        blockNumber = await getProvider().getBlockNumber()
      } catch (error) {
        console.error('Error retrieving current block number')
      }
      try {
        console.log(`[${new Date()}] Witnessing Crypto Prices at Block #${blockNumber}`)
        await getCryptoMarketPanel().report()
      } catch (error) {
        console.error(error)
      }
    },
    null,
    true,
    'America/Los_Angeles'
  )
  return cryptoMarketWitnessJob
}

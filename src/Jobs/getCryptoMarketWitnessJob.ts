import { CronJob } from 'cron'

import { getDefaultLogger } from '../Logger'
import { Job } from '../Model'
import { getCryptoMarketPanel } from '../Panels'
import { getProvider } from '../Providers'
import { everyMinute } from './CronSchedules'

export const getCryptoMarketWitnessJob = (schedule?: string): Job => {
  const logger = getDefaultLogger()
  const cryptoMarketWitnessJobSchedule = schedule || process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || everyMinute
  const cryptoMarketWitnessJob = new CronJob(
    cryptoMarketWitnessJobSchedule,
    async () => {
      let blockNumber = -1
      try {
        blockNumber = await getProvider().getBlockNumber()
      } catch (error) {
        logger.error('Error retrieving current block number')
      }
      try {
        logger.log(`Witnessing Crypto Prices at Block #${blockNumber}`)
        await getCryptoMarketPanel().report()
      } catch (error) {
        logger.error(error)
      }
    },
    null,
    true,
    'America/Los_Angeles'
  )
  return cryptoMarketWitnessJob
}

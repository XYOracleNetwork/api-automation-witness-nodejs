import { Agenda, DefineOptions, Job } from 'agenda'

import { getDefaultLogger } from '../Logger'
import { getCryptoMarketPanel } from '../Panels'

export const addJobs = async (agenda: Agenda) => {
  const logger = getDefaultLogger()

  // TODO: Depends on job schedule
  const options: DefineOptions = {
    lockLifetime: 10000,
  }

  agenda.define('test job', options, async (_job: Job) => {
    try {
      logger.log('Witnessing Crypto Prices')
      await getCryptoMarketPanel().report()
    } catch (error) {
      logger.error(error)
    }
  })

  await agenda.start()
}

import { Agenda, DefineOptions, Job } from 'agenda'
import { Express } from 'express'

import { getDefaultLogger } from '../Logger'
import { getCryptoMarketPanel } from '../Panels'

/**
 * Collection to use for managing jobs
 */
const collection = 'automationWitness'

export const addDistributedJobs = async (_app: Express) => {
  const agenda = configureAgenda()
  await addJobs(agenda)
  await addJobProcessors(agenda)
}

const configureAgenda = (): Agenda => {
  const address = process.env.MONGO_CONNECTION_STRING || 'mongodb://root:example@localhost:27017/job?authSource=admin'
  const db = { address, collection }
  const agenda = new Agenda({ db })

  // TODO: Depends on job interval
  const jobProcessingInterval = process.env.CRYPTO_MARKET_WITNESS_JOB_PROCESSING_INTERVAL || '20 seconds'
  agenda.processEvery(jobProcessingInterval)

  return agenda
}

const addJobs = async (agenda: Agenda) => {
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

const addJobProcessors = async (agenda: Agenda) => {
  const interval = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || '10 minutes'
  await agenda.every(interval, 'test job')
}

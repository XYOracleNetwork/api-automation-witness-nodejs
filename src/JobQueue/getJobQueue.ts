import { Agenda } from 'agenda'

/**
 * Collection to use for managing jobs
 */
const collection = 'automationWitness'

export const getJobQueue = (): Agenda => {
  const address = process.env.MONGO_CONNECTION_STRING || 'mongodb://root:example@localhost:27017/job?authSource=admin'
  const db = { address, collection }
  const jobQueue = new Agenda({ db })

  // TODO: Depends on job interval
  const jobProcessingInterval = process.env.CRYPTO_MARKET_WITNESS_JOB_PROCESSING_INTERVAL || '20 seconds'
  jobQueue.processEvery(jobProcessingInterval)

  return jobQueue
}
import { Agenda } from 'agenda'

/**
 * Collection to use for managing jobs
 */
const collection = 'automationWitness'

export const configureAgenda = (): Agenda => {
  const address = process.env.MONGO_CONNECTION_STRING || 'mongodb://root:example@localhost:27017/job?authSource=admin'
  const db = { address, collection }
  const agenda = new Agenda({ db })

  // TODO: Depends on job interval
  const jobProcessingInterval = process.env.CRYPTO_MARKET_WITNESS_JOB_PROCESSING_INTERVAL || '20 seconds'
  agenda.processEvery(jobProcessingInterval)

  return agenda
}

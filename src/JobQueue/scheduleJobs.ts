import { Agenda } from 'agenda'

export const scheduleJobs = async (jobQueue: Agenda) => {
  const interval = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || '10 minutes'
  await jobQueue.every(interval, 'test job')
}

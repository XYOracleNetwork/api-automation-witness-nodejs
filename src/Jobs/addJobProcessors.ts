import { Agenda } from 'agenda'

export const addJobProcessors = async (agenda: Agenda) => {
  const interval = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || '10 minutes'
  await agenda.every(interval, 'test job')
}

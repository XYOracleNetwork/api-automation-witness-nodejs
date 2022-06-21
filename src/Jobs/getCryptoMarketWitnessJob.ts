import { CronJob } from 'cron'

import { Job } from '../Model'

const testJob = new CronJob('* * * * *', () => console.log('Job ran'), null, true, 'America/Los_Angeles')

export const getCryptoMarketWitnessJob = (): Job => {
  return testJob
}

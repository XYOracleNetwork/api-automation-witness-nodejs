import { Express } from 'express'

import { addJobProcessors, addJobs, configureAgenda } from '../Jobs'

export const addDistributedJobs = async (_app: Express) => {
  const agenda = configureAgenda()
  await addJobs(agenda)
  await addJobProcessors(agenda)
}

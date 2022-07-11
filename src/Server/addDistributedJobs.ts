import { Express } from 'express'

import { addJobProcessors } from '../JobProcessors'
import { addJobQueue } from '../JobQueue'
import { addJobs } from '../Jobs'

export const addDistributedJobs = async (_app: Express) => {
  const jobQueue = addJobQueue()
  await addJobs(jobQueue)
  await addJobProcessors(jobQueue)
}

import { Express } from 'express'

import { addJobProcessors } from '../JobProcessors'
import { getJobQueue, startJobQueue } from '../JobQueue'
import { defineJobs } from '../Jobs'

export const addDistributedJobs = async (_app: Express) => {
  const jobQueue = getJobQueue()
  defineJobs(jobQueue)
  await startJobQueue(jobQueue)
  await addJobProcessors(jobQueue)
}

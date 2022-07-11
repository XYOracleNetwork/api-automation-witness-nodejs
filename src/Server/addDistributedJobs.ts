import { Express } from 'express'

import { getJobQueue, scheduleJobs, startJobQueue } from '../JobQueue'
import { defineJobs, getJobs } from '../Jobs'

export const addDistributedJobs = async (_app: Express) => {
  const jobQueue = getJobQueue()
  const jobs = getJobs()
  defineJobs(jobQueue, jobs)
  await startJobQueue(jobQueue)
  await scheduleJobs(jobQueue, jobs)
}

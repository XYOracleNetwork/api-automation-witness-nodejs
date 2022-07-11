import { Agenda } from 'agenda'

import { Job } from '../Model'

export const scheduleJobs = async (jobQueue: Agenda, jobs: Job[]) => {
  await Promise.all(jobs.map(async (job) => await jobQueue.every(job.schedule, job.name)))
}

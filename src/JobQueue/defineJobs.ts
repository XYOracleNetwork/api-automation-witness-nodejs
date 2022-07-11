import { Agenda, DefineOptions } from 'agenda'

import { Job } from '../Model'

// TODO: Depends on job schedule, calculate dynamically
// to something like 25% of schedule to allow for retries
const options: DefineOptions = { lockLifetime: 10000 }

export const defineJobs = (jobQueue: Agenda, jobs: Job[]) => {
  jobs.map((job) => jobQueue.define(job.name, options, job.task))
}

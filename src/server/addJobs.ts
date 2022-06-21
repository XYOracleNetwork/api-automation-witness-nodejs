import { Express } from 'express'

import { getJobs } from '../Jobs'

export const addJobs = (app: Express) => {
  app.locals.jobs = getJobs()
}

jest.useFakeTimers().setSystemTime(Date.now())

import { Job } from '../Model'
import { everyMinute } from './CronSchedules'
import { getJobs } from './getJobs'

describe('getJobs', () => {
  let jobs: Job[] = []
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      /* */
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      /* */
    })
    process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE = everyMinute
    jobs = getJobs()
  })
  afterAll(() => {
    jobs.map((job) => job.stop())
  })
  it('gets jobs', () => {
    expect(jobs).toBeTruthy()
    expect(Array.isArray(jobs)).toBeTruthy()
    expect(jobs.length).toBeGreaterThan(0)
  })
  it('runs jobs on schedule', () => {
    // Advance system clock by > 1 min
    jest.advanceTimersByTime(1000 * 60 * 1 + 1)
  })
})

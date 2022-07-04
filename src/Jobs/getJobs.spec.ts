jest.useFakeTimers().setSystemTime(Date.now())

import { Job } from '../Model'
import { getJobs } from './getJobs'

describe('getJobs', () => {
  let jobs: Job[] = []
  beforeAll(() => {
    jobs = getJobs()
  })
  afterAll(() => {
    jobs.map((job) => job.start())
  })
  it('gets jobs', () => {
    expect(jobs).toBeTruthy()
    expect(Array.isArray(jobs)).toBeTruthy()
    expect(jobs.length).toBeGreaterThan(0)
  })
  it('runs jobs on schedule', () => {
    jest.advanceTimersByTime(1000 * 60 * 1 + 1)
  })
})

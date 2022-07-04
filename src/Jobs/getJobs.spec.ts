jest.useFakeTimers().setSystemTime(Date.now())

import { getJobs } from './getJobs'

describe('getJobs', () => {
  it('gets jobs', () => {
    const jobs = getJobs()
    expect(jobs).toBeTruthy()
    expect(Array.isArray(jobs)).toBeTruthy()
    expect(jobs.length).toBeGreaterThan(0)
  })
  it('runs jobs on schedule', () => {
    jest.advanceTimersByTime(1000 * 60 * 10 + 1)
  })
})

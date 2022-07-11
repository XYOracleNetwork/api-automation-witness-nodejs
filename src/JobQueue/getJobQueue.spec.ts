import { getJobQueue } from './getJobQueue'

describe('getJobQueue', () => {
  it('gets the job queue', () => {
    const jobQueue = getJobQueue()
    expect(jobQueue).toBeObject()
  })
})

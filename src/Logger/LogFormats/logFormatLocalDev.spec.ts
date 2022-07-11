import { logFormatLocalDev } from './logFormatLocalDev'

describe('logFormatLocalDev', () => {
  it('provides a logger format', () => {
    expect(logFormatLocalDev).toBeObject()
  })
})

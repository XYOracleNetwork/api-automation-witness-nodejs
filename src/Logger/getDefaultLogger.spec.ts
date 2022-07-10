import { getDefaultLogger } from './getDefaultLogger'

describe('getDefaultLogger', () => {
  it('provides a default logger', () => {
    const logger = getDefaultLogger()
    expect(logger).toBeObject()
  })
})

import { getInfuraProvider } from './getInfuraProvider'

describe('getInfuraProvider', () => {
  it('returns a Provider', () => {
    const provider = getInfuraProvider()
    expect(provider).toBeDefined()
    expect(provider).toBeTruthy()
    expect(provider._isProvider).toBeTruthy()
  })
})

import { canUseProvider, getInfuraProvider } from './getInfuraProvider'

describe('getInfuraProvider', () => {
  it('returns a Provider', () => {
    if (canUseProvider()) {
      const provider = getInfuraProvider()
      expect(provider).toBeDefined()
      expect(provider).toBeTruthy()
      expect(provider._isProvider).toBeTruthy()
    }
  })
})

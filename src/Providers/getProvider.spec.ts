import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('returns a Provider', () => {
    const provider = getProvider()
    expect(provider).toBeDefined()
    expect(provider).toBeTruthy()
    expect(provider._isProvider).toBeTruthy()
  })
})

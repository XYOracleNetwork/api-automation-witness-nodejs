import { getProvider } from '../Providers'
import { getCryptoMarketWitness } from './getCryptoMarketWitness'

describe('getCryptoMarketWitness', () => {
  it('gets witnesses using supplied provider', () => {
    const panel = getCryptoMarketWitness(getProvider())
    expect(panel).toBeTruthy()
  })
  it('gets witnesses using default provider if no provider supplied', () => {
    const panel = getCryptoMarketWitness()
    expect(panel).toBeTruthy()
  })
})

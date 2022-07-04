import { getProvider } from '../Providers'
import { getCryptoMarketPanel } from './getCryptoMarketPanel'

describe('getCryptoMarketPanel', () => {
  it('gets panel using supplied provider', () => {
    const panel = getCryptoMarketPanel(getProvider())
    expect(panel).toBeTruthy()
  })
  it('gets panel using default provider if no provider supplied', () => {
    const panel = getCryptoMarketPanel()
    expect(panel).toBeTruthy()
  })
})

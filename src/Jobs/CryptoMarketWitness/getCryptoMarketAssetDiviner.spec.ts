import { getCryptoMarketAssetDiviner } from './getCryptoMarketAssetDiviner'

describe('getCryptoMarketAssetDiviner', () => {
  it('gets the getCryptoMarketAssetDiviner', () => {
    const diviner = getCryptoMarketAssetDiviner()
    expect(diviner).toBeObject()
    expect(diviner.divine).toBeFunction()
  })
})

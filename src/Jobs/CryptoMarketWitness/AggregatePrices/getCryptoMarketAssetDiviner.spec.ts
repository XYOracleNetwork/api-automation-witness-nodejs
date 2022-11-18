import { getCryptoMarketAssetDiviner } from './getCryptoMarketAssetDiviner'

describe('getCryptoMarketAssetDiviner', () => {
  it('gets the getCryptoMarketAssetDiviner', async () => {
    const diviner = await getCryptoMarketAssetDiviner()
    expect(diviner).toBeObject()
    expect(diviner.query).toBeFunction()
  })
})

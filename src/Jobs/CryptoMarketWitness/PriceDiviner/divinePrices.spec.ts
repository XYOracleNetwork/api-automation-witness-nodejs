import { divinePrices } from './divinePrices'
import { sampleCoinGeckoPayload, sampleUniswapPayload } from './sampleResponses.spec'

describe('divinePrices', () => {
  it('divines prices', () => {
    const result = divinePrices(sampleCoinGeckoPayload, sampleUniswapPayload)
    expect(result).toBeObject()
    expect(result.assets.xyo?.value.usd).toBe('0.014635635000000001')
    expect(result.timestamp).toBeNumber()
  })
})

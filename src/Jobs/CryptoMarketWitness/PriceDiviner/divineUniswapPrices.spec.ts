import { divineUniswapPrices } from './divineUniswapPrices'
import { sampleUniswapPayload } from './sampleResponses.spec'

describe('divineUniswapPrices', () => {
  it('divines prices from Uniswap', () => {
    const result = divineUniswapPrices(sampleUniswapPayload)
    expect(result).toBe(0.0148782)
  })
})

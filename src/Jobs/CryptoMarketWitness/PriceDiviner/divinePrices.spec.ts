import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'

import { divinePrices } from './divinePrices'

const coinGeckoPayload: XyoCryptoMarketCoinGeckoPayload = {
  assets: {
    xyo: {
      usd: 0.01439307,
    },
  },
  schema: 'network.xyo.crypto.market.coingecko',
  timestamp: 1659012060785,
}

const uniswapPayload: XyoCryptoMarketUniswapPayload = {
  pairs: [
    {
      tokens: [
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 0.0148782,
        },
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          symbol: 'usdt',
          value: 67.2123,
        },
      ],
    },
  ],
  schema: 'network.xyo.crypto.market.uniswap',
  timestamp: 1659012011418,
}

describe('divinePrices', () => {
  it('divines prices', () => {
    const result = divinePrices(coinGeckoPayload, uniswapPayload)
    expect(result).toBeObject()
    expect(result.assets.xyo?.value.usd).toBe('0.014635635000000001')
    expect(result.timestamp).toBeNumber()
  })
})

import { XyoCryptoMarketUniswapPayload } from '@xyo-network/cryptomarket-witness'

import { XyoCryptoMarketAssetPayload } from '../../../Model'

const xyo = 'xyo'
const usdt = 'usdt'

export const divineUniswapPrices = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined): XyoCryptoMarketAssetPayload => {
  uniswapPayload?.pairs
    .map((p) => p.tokens)
    .filter((t) => t.some((t) => t.symbol.toLowerCase() === xyo))
    ?.find((t) => t.some((t) => t.symbol.toLowerCase() === usdt))
    ?.find((t) => t.symbol === xyo)?.value
  throw new Error('')
}

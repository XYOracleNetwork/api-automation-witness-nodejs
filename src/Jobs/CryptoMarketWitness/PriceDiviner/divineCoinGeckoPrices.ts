import { XyoCryptoMarketCoinGeckoPayload } from '@xyo-network/cryptomarket-witness'

export const divineCoinGeckoPrices = (coingeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined) => coingeckoPayload?.assets?.xyo?.usd

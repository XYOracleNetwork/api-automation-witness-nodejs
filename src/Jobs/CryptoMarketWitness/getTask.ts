import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'
import { getAdHocPanel } from './getAdHocPanel'
import { divinePrices } from './PriceDiviner'

const uniswapSchema = 'network.xyo.crypto.market.uniswap'
const coingeckoSchema = 'network.xyo.crypto.market.coingecko'

const isUniswapPayload = (p: XyoPayload): p is XyoCryptoMarketUniswapPayload => p.schema === uniswapSchema
const isCoingeckoPayload = (p: XyoPayload): p is XyoCryptoMarketCoinGeckoPayload => p.schema === coingeckoSchema

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      const result = await getCryptoMarketPanel().report()
      logger.log('Witnessed Crypto Prices')
      logger.log('Witnessing Aggregated Crypto Prices')
      const coingeckoPayload = result._payloads?.filter(isCoingeckoPayload)?.pop()
      const uniswapPayload = result._payloads?.filter(isUniswapPayload)?.pop()
      const prices = divinePrices(coingeckoPayload, uniswapPayload)
      const panel = getAdHocPanel(prices)
      await panel.report()
      logger.log('Witnessed Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

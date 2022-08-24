import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { assertEx } from '@xylabs/sdk-js'
import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoDivinerDivineQueryPayload, XyoDivinerDivineQuerySchema, XyoPayload } from '@xyo-network/sdk-xyo-client-js'
import { XyoUniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import compact from 'lodash/compact'

import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'
import { getAdHocPanel } from './getAdHocPanel'
import { getCryptoMarketAssetDiviner } from './getCryptoMarketAssetDiviner'

const uniswapSchema = 'network.xyo.crypto.market.uniswap'
const coingeckoSchema = 'network.xyo.crypto.market.coingecko'

const isUniswapPayload = (p: XyoPayload): p is XyoUniswapCryptoMarketPayload => p.schema === uniswapSchema
const isCoingeckoPayload = (p: XyoPayload): p is XyoCoingeckoCryptoMarketPayload => p.schema === coingeckoSchema

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      const result = await getCryptoMarketPanel().report()
      logger.log('Witnessed Crypto Prices')
      logger.log('Divining Aggregated Crypto Prices')
      const coinGeckoPayload = result._payloads?.filter(isCoingeckoPayload)?.pop()
      const uniswapPayload = result._payloads?.filter(isUniswapPayload)?.pop()
      const diviner = getCryptoMarketAssetDiviner()
      const query: XyoDivinerDivineQueryPayload = {
        payloads: compact([coinGeckoPayload, uniswapPayload]),
        schema: XyoDivinerDivineQuerySchema,
      }
      const answer = await diviner.query(query)
      const prices = assertEx(answer[1][0], 'Empty XyoCryptoMarketAssetPayload response from diviner')
      const panel = getAdHocPanel(prices)
      await panel.report()
      logger.log('Divined Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

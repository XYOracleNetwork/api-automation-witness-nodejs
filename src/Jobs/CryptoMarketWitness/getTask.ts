import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { assertEx, exists } from '@xylabs/sdk-js'
import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { XyoPayload } from '@xyo-network/payload'
import { XyoUniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'

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
      const cryptoMarketPanel = await getCryptoMarketPanel()
      const [, payloads] = await cryptoMarketPanel.report()
      logger.log('Witnessed Crypto Prices')
      logger.log('Divining Aggregated Crypto Prices')
      const coinGeckoPayload = payloads?.filter(isCoingeckoPayload)?.pop()
      const uniswapPayload = payloads?.filter(isUniswapPayload)?.pop()
      const results = [coinGeckoPayload, uniswapPayload].filter(exists)
      const diviner = await getCryptoMarketAssetDiviner()
      const answer = (await new XyoDivinerWrapper(diviner).divine(results)).pop()
      const prices = assertEx(answer, 'Empty XyoCryptoMarketAssetPayload response from diviner')
      const panel = await getAdHocPanel(prices)
      await panel.report()
      logger.log('Divined Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

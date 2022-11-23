import { assertEx } from '@xylabs/assert'
import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { XyoDivinerWrapper } from '@xyo-network/diviner'

import { Task } from '../../Model'
import { getAggregatePricePanel } from './getAggregatePricePanel'
import { getCryptoMarketAssetDiviner } from './getCryptoMarketAssetDiviner'
import { getCryptoMarketPanel } from './getCryptoMarketPanel'

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      const cryptoMarketPanel = await getCryptoMarketPanel()
      const [, payloads] = await cryptoMarketPanel.report()
      logger.log('Witnessed Crypto Prices')
      logger.log('Divining Aggregated Crypto Prices')
      const diviner = await getCryptoMarketAssetDiviner()
      const answer = (await new XyoDivinerWrapper(diviner).divine(payloads)).pop()
      const prices = assertEx(answer, 'Empty XyoCryptoMarketAssetPayload response from diviner')
      logger.log('Divined Aggregated Crypto Prices')
      logger.log('Witnessing Aggregated Crypto Prices')
      const panel = await getAggregatePricePanel(prices)
      await panel.report()
      logger.log('Witnessed Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

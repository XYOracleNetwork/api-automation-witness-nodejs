import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'

import { Task } from '../../Model'
import { divineAggregatePrices } from './divineAggregatePrices'
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
      await divineAggregatePrices(payloads)
      logger.log('Divined Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'

import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      await getCryptoMarketPanel().report()
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

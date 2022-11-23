import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'

import { Task } from '../../Model'
import { divineAggregateGas } from './divineAggregateGas'
import { getEthereumGasPanel } from './getEthereumGasPanel'

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Ethereum Gas')
      const cryptoMarketPanel = await getEthereumGasPanel()
      const [, payloads] = await cryptoMarketPanel.report()
      logger.log('Witnessed Ethereum Gas')
      logger.log('Divining Aggregated Gas Price')
      await divineAggregateGas(payloads)
      logger.log('Divined Aggregated Gas Price')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

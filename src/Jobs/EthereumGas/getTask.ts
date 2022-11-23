import { assertEx } from '@xylabs/assert'
import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { Task } from '@xyo-network/shared'

import { getEthereumGasDiviner } from './getEthereumGasDiviner'
import { getEthereumGasDivinerResultPanel } from './getEthereumGasDivinerResultPanel'
import { getEthereumGasWitnessPanel } from './getEthereumGasWitnessPanel'

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Ethereum Gas')
      const cryptoMarketPanel = await getEthereumGasWitnessPanel()
      const [, payloads] = await cryptoMarketPanel.report()
      logger.log('Witnessed Ethereum Gas')
      logger.log('Divining Aggregated Gas Price')
      const diviner = await getEthereumGasDiviner()
      const answer = (await new XyoDivinerWrapper(diviner).divine(payloads)).pop()
      const prices = assertEx(answer, 'Empty XyoEthereumGasPayload response from diviner')
      logger.log('Divined Aggregated Gas Price')
      logger.log('Witnessing Aggregated Gas Price')
      const panel = await getEthereumGasDivinerResultPanel(prices)
      await panel.report()
      logger.log('Witnessed Aggregated Gas Price')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

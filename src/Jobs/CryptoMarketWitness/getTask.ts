import { assertEx } from '@xylabs/assert'
import { exists } from '@xylabs/exists'
import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { XyoCoingeckoCryptoMarketPayload, XyoCoingeckoCryptoMarketSchema } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { XyoEthereumGasEtherchainV1Payload, XyoEthereumGasEtherchainV1Schema } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { XyoEthereumGasEtherchainV2Payload, XyoEthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { XyoEthereumGasEtherscanPayload, XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { XyoUniswapCryptoMarketPayload, XyoUniswapCryptoMarketSchema } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'
import { getAggregatePricePanel } from './getAdHocPanel'
import { getCryptoMarketAssetDiviner } from './getCryptoMarketAssetDiviner'
import { getEthereumGasDiviner } from './getEthereumGasDiviner'

const isUniswapPayload = (p: XyoPayload): p is XyoUniswapCryptoMarketPayload => p.schema === XyoUniswapCryptoMarketSchema
const isCoingeckoPayload = (p: XyoPayload): p is XyoCoingeckoCryptoMarketPayload => p.schema === XyoCoingeckoCryptoMarketSchema

const isEthereumGasEtherchainV1Payload = (p: XyoPayload): p is XyoEthereumGasEtherchainV1Payload => p.schema === XyoEthereumGasEtherchainV1Schema
const isEthereumGasEtherchainV2Payload = (p: XyoPayload): p is XyoEthereumGasEtherchainV2Payload => p.schema === XyoEthereumGasEtherchainV2Schema
const isEthereumGasEtherscanPayload = (p: XyoPayload): p is XyoEthereumGasEtherscanPayload => p.schema === XyoEthereumGasEtherscanSchema

const divineAggregatePrices = async (payloads: XyoPayload[]) => {
  const coinGeckoPayload = payloads?.filter(isCoingeckoPayload)?.pop()
  const uniswapPayload = payloads?.filter(isUniswapPayload)?.pop()
  const results = [coinGeckoPayload, uniswapPayload].filter(exists)
  const diviner = await getCryptoMarketAssetDiviner()
  const answer = (await new XyoDivinerWrapper(diviner).divine(results)).pop()
  const prices = assertEx(answer, 'Empty XyoCryptoMarketAssetPayload response from diviner')
  const panel = await getAggregatePricePanel(prices)
  await panel.report()
}

const divineAggregateGasPrices = async (payloads: XyoPayload[]) => {
  const ethereumGasEtherchainV1Payload = payloads?.filter(isEthereumGasEtherchainV1Payload)?.pop()
  const ethereumGasEtherchainV2Payload = payloads?.filter(isEthereumGasEtherchainV2Payload)?.pop()
  const ethereumGasEtherscanPayload = payloads?.filter(isEthereumGasEtherscanPayload)?.pop()
  const diviner = await getEthereumGasDiviner()
  const result = [ethereumGasEtherchainV1Payload, ethereumGasEtherchainV2Payload, ethereumGasEtherscanPayload].filter(exists)
  const answer = (await new XyoDivinerWrapper(diviner).divine(result)).pop()
  const prices = assertEx(answer, 'Empty XyoEthereumGasPayload response from diviner')
  // TODO: Create panel for gas result
  // const panel = await getAggregatePricePanel(prices)
  // await panel.report()
}

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
      logger.log('Divining Aggregated Gas Price')
      await divineAggregateGasPrices(payloads)
      logger.log('Divined Aggregated Gas Price')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

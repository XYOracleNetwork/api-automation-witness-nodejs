import { assertEx } from '@xylabs/assert'
import { exists } from '@xylabs/exists'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { XyoEthereumGasEtherchainV1Payload, XyoEthereumGasEtherchainV1Schema } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { XyoEthereumGasEtherchainV2Payload, XyoEthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { XyoEthereumGasEtherscanPayload, XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'

import { getAggregateEthereumGasPanel } from './getAggregateEthereumGasPanel'
import { getEthereumGasDiviner } from './getEthereumGasDiviner'

const isEthereumGasEtherchainV1Payload = (p: XyoPayload): p is XyoEthereumGasEtherchainV1Payload => p.schema === XyoEthereumGasEtherchainV1Schema
const isEthereumGasEtherchainV2Payload = (p: XyoPayload): p is XyoEthereumGasEtherchainV2Payload => p.schema === XyoEthereumGasEtherchainV2Schema
const isEthereumGasEtherscanPayload = (p: XyoPayload): p is XyoEthereumGasEtherscanPayload => p.schema === XyoEthereumGasEtherscanSchema

export const divineAggregateGas = async (payloads: XyoPayload[]) => {
  const ethereumGasEtherchainV1Payload = payloads?.filter(isEthereumGasEtherchainV1Payload)?.pop()
  const ethereumGasEtherchainV2Payload = payloads?.filter(isEthereumGasEtherchainV2Payload)?.pop()
  const ethereumGasEtherscanPayload = payloads?.filter(isEthereumGasEtherscanPayload)?.pop()
  const diviner = await getEthereumGasDiviner()
  const result = [ethereumGasEtherchainV1Payload, ethereumGasEtherchainV2Payload, ethereumGasEtherscanPayload].filter(exists)
  const answer = (await new XyoDivinerWrapper(diviner).divine(result)).pop()
  const prices = assertEx(answer, 'Empty XyoEthereumGasPayload response from diviner')
  const panel = await getAggregateEthereumGasPanel(prices)
  await panel.report()
}

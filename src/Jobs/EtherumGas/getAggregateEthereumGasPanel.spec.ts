import { XyoPayloadBuilder } from '@xyo-network/payload'

import { getAggregateEthereumGasPanel } from './getAggregateEthereumGasPanel'

describe('getEthereumGasPanel', () => {
  it('gets an getEthereumGasPanel', async () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(await getAggregateEthereumGasPanel(payload)).toBeObject()
  })
})

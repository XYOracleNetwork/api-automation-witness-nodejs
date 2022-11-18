import { XyoPayloadBuilder } from '@xyo-network/payload'

import { getEthereumGasPanel } from './getEthereumGasPanel'

describe('getEthereumGasPanel', () => {
  it('gets an getEthereumGasPanel', async () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(await getEthereumGasPanel(payload)).toBeObject()
  })
})

import { XyoPayloadBuilder } from '@xyo-network/payload'

import { getEthereumGasDivinerResultPanel } from './getEthereumGasDivinerResultPanel'

describe('getEthereumGasDivinerResultPanel', () => {
  it('gets a panel', async () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(await getEthereumGasDivinerResultPanel(payload)).toBeObject()
  })
})

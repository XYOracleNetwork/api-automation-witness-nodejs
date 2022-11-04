import { XyoPayloadBuilder } from '@xyo-network/payload'

import { getAdHocPanel } from './getAdHocPanel'

describe('getAdHocPanel', () => {
  it('gets an AdHocPanel', async () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(await getAdHocPanel(payload)).toBeObject()
  })
})

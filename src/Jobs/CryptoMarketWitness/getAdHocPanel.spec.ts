import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

import { getAdHocPanel } from './getAdHocPanel'

describe('getAdHocPanel', () => {
  it('gets an AdHocPanel', () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(getAdHocPanel(payload)).toBeObject()
  })
})

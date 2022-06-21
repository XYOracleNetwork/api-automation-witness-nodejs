import { XyoApiConfig, XyoArchivistApi, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getApiConfig } from './getApiConfig'
import { getArchive } from './getArchive'
import { witnessPayload } from './witnessPayload'

export const storeObservation = (payload: XyoPayload, config: XyoApiConfig = getApiConfig(), archive = getArchive()) => {
  const sdk = new XyoArchivistApi(config)
  const bw = witnessPayload(payload)
  return sdk.archive(archive).block.post([bw])
}

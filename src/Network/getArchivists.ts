import { XyoApiConfig, XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'

import { getApiConfig } from './getApiConfig'

export const getArchivists = (config: XyoApiConfig = getApiConfig()): XyoArchivistApi[] => {
  return [new XyoArchivistApi(config)]
}

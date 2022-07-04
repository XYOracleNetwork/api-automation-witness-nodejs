import { XyoApiConfig, XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'

import { getApiConfig } from './getApiConfig'

export const getArchivists = (configs: XyoApiConfig[] = [getApiConfig()]): XyoArchivistApi[] => {
  return configs.map((config) => new XyoArchivistApi(config))
}

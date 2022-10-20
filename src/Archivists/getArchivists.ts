import {
  PayloadArchivist,
  XyoApiConfig,
  XyoArchivistApi,
  XyoModule,
  XyoRemoteArchivist,
  XyoRemoteArchivistConfigSchema,
} from '@xyo-network/sdk-xyo-client-js'

import { getApiConfig } from './getApiConfig'

export const getArchivists = (configs: XyoApiConfig[] = [getApiConfig()]): (PayloadArchivist & XyoModule)[] => {
  return configs.map((config) => new XyoRemoteArchivist({ api: new XyoArchivistApi(config), schema: XyoRemoteArchivistConfigSchema }))
}

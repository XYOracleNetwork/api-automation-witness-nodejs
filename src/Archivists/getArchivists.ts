import {
  PayloadArchivist,
  XyoApiConfig,
  XyoArchivistApi,
  XyoModule,
  XyoRemoteArchivist,
  XyoRemoteArchivistConfigSchema,
} from '@xyo-network/sdk-xyo-client-js'

import { getApiConfig } from './getApiConfig'
import { getArchive } from './getArchive'

const schema = XyoRemoteArchivistConfigSchema

export const getArchivists = (configs: XyoApiConfig[] = [getApiConfig()]): (PayloadArchivist & XyoModule)[] => {
  const archive = getArchive()
  return configs.map((config) => new XyoRemoteArchivist({ api: new XyoArchivistApi(config), archive, schema }))
}

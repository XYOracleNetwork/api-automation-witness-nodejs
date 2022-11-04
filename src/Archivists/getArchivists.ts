import { XyoArchivistApi, XyoRemoteArchivist, XyoRemoteArchivistConfigSchema } from '@xyo-network/api'
import { XyoApiConfig } from '@xyo-network/api-models'
import { PayloadArchivist } from '@xyo-network/archivist'
import { XyoModule } from '@xyo-network/module'

import { getApiConfig } from './getApiConfig'
import { getArchive } from './getArchive'

const schema = XyoRemoteArchivistConfigSchema

export const getArchivists = async (configs: XyoApiConfig[] = [getApiConfig()]): Promise<(PayloadArchivist & XyoModule)[]> => {
  const archive = getArchive()
  const archivists: (PayloadArchivist & XyoModule)[] = []
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i]
    const archivist = await XyoRemoteArchivist.create({ config: { api: new XyoArchivistApi(config), archive, schema } })
    archivists.push(archivist)
  }
  return archivists
}

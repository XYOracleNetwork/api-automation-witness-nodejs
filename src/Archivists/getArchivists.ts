import { XyoArchivistApi, XyoRemoteArchivist, XyoRemoteArchivistConfig, XyoRemoteArchivistConfigSchema } from '@xyo-network/api'
import { XyoApiConfig } from '@xyo-network/api-models'
import { PayloadArchivist } from '@xyo-network/archivist'
import { XyoModule } from '@xyo-network/module'

import { getApiConfig } from './getApiConfig'
import { getArchive } from './getArchive'
import { getSigningAccount } from './getSigningAccount'

const schema = XyoRemoteArchivistConfigSchema

export const getArchivists = async (configs: XyoApiConfig[] = [getApiConfig()]): Promise<(PayloadArchivist & XyoModule)[]> => {
  const account = getSigningAccount()
  const archive = getArchive()
  const archivists: (PayloadArchivist & XyoModule)[] = []
  for (let i = 0; i < configs.length; i++) {
    const apiConfig = configs[i]
    const config: XyoRemoteArchivistConfig = { api: new XyoArchivistApi(apiConfig), archive, schema }
    const archivist = await XyoRemoteArchivist.create({ account, config })
    archivists.push(archivist)
  }
  return archivists
}

import {
  XyoAdhocWitness,
  XyoModule,
  XyoModuleResolverFunc,
  XyoPanel,
  XyoPanelConfig,
  XyoPanelConfigSchema,
  XyoPayload,
} from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists } from '../../Archivists'

export const getAdHocPanel = (prices: XyoPayload): XyoPanel => {
  // TODO: Where to fit archive
  const archive = getArchive()
  const archivistModule = getArchivists()
  const witnessModule = new XyoAdhocWitness(prices)
  const modules: XyoModule[] = [...archivistModule, witnessModule]
  const archivists = ['TODO']
  const witnesses = ['TODO']
  const resolver: XyoModuleResolverFunc = (address: string) => {
    return (modules.find((mod) => mod?.address === address) as XyoModule) || null
  }
  const config: XyoPanelConfig = {
    archivists,
    schema: XyoPanelConfigSchema,
    witnesses,
  }
  return new XyoPanel(config, undefined, resolver)
}

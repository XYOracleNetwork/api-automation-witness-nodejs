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
  const archivists = getArchivists()
  const witnesses = [new XyoAdhocWitness(prices)]
  const modules: XyoModule[] = [...archivists, ...witnesses]
  const resolver: XyoModuleResolverFunc = (address: string) => (modules.find((mod) => mod?.address === address) as XyoModule) || null
  const config: XyoPanelConfig = {
    archivists: archivists.map((mod) => mod.address),
    schema: XyoPanelConfigSchema,
    witnesses: witnesses.map((mod) => mod.address),
  }
  return new XyoPanel(config, undefined, resolver)
}

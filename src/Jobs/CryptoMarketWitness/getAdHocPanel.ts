import {
  XyoAdhocWitness,
  XyoAdhocWitnessConfigSchema,
  XyoModule,
  XyoModuleResolver,
  XyoPanel,
  XyoPanelConfig,
  XyoPanelConfigSchema,
  XyoPayload,
} from '@xyo-network/sdk-xyo-client-js'

import { getArchivists } from '../../Archivists'

export const getAdHocPanel = async (prices: XyoPayload): Promise<XyoPanel> => {
  const archivists = await getArchivists()
  const witnesses = [await XyoAdhocWitness.create({ config: { payload: prices, schema: XyoAdhocWitnessConfigSchema, targetSchema: '' } })]
  const modules: XyoModule[] = [...archivists, ...witnesses]
  const resolver = new XyoModuleResolver()
  modules.map((mod) => resolver.add(mod))
  const config: XyoPanelConfig = {
    archivists: archivists.map((mod) => mod.address),
    schema: XyoPanelConfigSchema,
    witnesses: witnesses.map((mod) => mod.address),
  }
  return await XyoPanel.create({ config, resolver })
}

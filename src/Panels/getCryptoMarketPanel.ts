import { Provider } from '@ethersproject/providers'
import { XyoModule, XyoModuleResolver, XyoPanel, XyoPanelConfig, XyoPanelConfigSchema } from '@xyo-network/sdk-xyo-client-js'

import { getArchivists } from '../Archivists'
import { getProvider } from '../Providers'
import { getCryptoMarketWitness } from '../Witnesses'
import { PanelProvider } from './PanelProvider'

/**
 * Static panel to prevent recreation/re-initialization of panel
 * dependencies each time
 */
let panel: XyoPanel | undefined = undefined

export const getCryptoMarketPanel: PanelProvider<Provider> = async (provider = getProvider()): Promise<XyoPanel> => {
  const archivists = await getArchivists()
  const witnesses = await getCryptoMarketWitness(provider)
  const modules: XyoModule[] = [...archivists, ...witnesses]
  const resolver: XyoModuleResolver = new XyoModuleResolver()
  modules.map((mod) => resolver.add(mod))
  const config: XyoPanelConfig = {
    archivists: archivists.map((mod) => mod.address),
    schema: XyoPanelConfigSchema,
    witnesses: witnesses.map((mod) => mod.address),
  }
  panel = await XyoPanel.create({ config, resolver })
  return panel
}

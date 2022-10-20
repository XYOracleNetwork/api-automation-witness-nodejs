import { Provider } from '@ethersproject/providers'
import { XyoModule, XyoModuleResolverFunc, XyoPanel, XyoPanelConfig, XyoPanelConfigSchema } from '@xyo-network/sdk-xyo-client-js'

import { getArchivists } from '../Archivists'
import { getProvider } from '../Providers'
import { getCryptoMarketWitness } from '../Witnesses'
import { PanelProvider } from './PanelProvider'

/**
 * Static panel to prevent recreation/re-initialization of panel
 * dependencies each time
 */
let panel: XyoPanel | undefined = undefined

export const getCryptoMarketPanel: PanelProvider<Provider> = (provider = getProvider()): XyoPanel => {
  const archivists = getArchivists()
  const witnesses = getCryptoMarketWitness(provider)
  const modules: XyoModule[] = [...archivists, ...witnesses]
  const resolver: XyoModuleResolverFunc = (address: string) => (modules.find((mod) => mod?.address === address) as XyoModule) || null
  const config: XyoPanelConfig = {
    archivists: archivists.map((mod) => mod.address),
    schema: XyoPanelConfigSchema,
    witnesses: witnesses.map((mod) => mod.address),
  }
  panel = new XyoPanel(config, undefined, resolver)
  return panel
}

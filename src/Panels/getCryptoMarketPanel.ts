import { Provider } from '@ethersproject/providers'
import { XyoPanel } from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists, getSigningAccount } from '../Archivists'
import { getProvider } from '../Providers'
import { getCryptoMarketWitness } from '../Witnesses'
import { PanelProvider } from './PanelProvider'

/**
 * Static panel to prevent recreation/reinitialization of panel
 * dependencies each time
 */
let panel: XyoPanel | undefined = undefined

export const getCryptoMarketPanel: PanelProvider<Provider> = (provider = getProvider()): XyoPanel => {
  // if (panel) return panel
  const account = getSigningAccount()
  const archive = getArchive()
  const archivists = getArchivists()
  const witnesses = getCryptoMarketWitness(provider)
  panel = new XyoPanel({ account, archive, archivists, witnesses })
  return panel
}

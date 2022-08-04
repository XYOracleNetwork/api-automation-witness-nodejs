import { Provider } from '@ethersproject/providers'
import { XyoPanel } from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists, getSigningAccount } from '../Archivists'
import { getProvider } from '../Providers'
import { getCryptoMarketWitness } from '../Witnesses'
import { PanelProvider } from './PanelProvider'

/**
 * Static panel to prevent recreation/re-initialization of panel
 * dependencies each time
 */
let panel: XyoPanel | undefined = undefined

export const getCryptoMarketPanel: PanelProvider<Provider> = (provider = getProvider()): XyoPanel => {
  // if (panel) return panel
  console.log('getCryptoMarketPanel: getting account')
  const account = getSigningAccount()
  console.log('getCryptoMarketPanel: getting archive')
  const archive = getArchive()
  console.log('getCryptoMarketPanel: getting archivists')
  const archivists = getArchivists()
  console.log('getCryptoMarketPanel: getting witnesses')
  const witnesses = getCryptoMarketWitness(provider)
  console.log('getCryptoMarketPanel: getting panel')
  panel = new XyoPanel({ account, archive, archivists, witnesses })
  return panel
}

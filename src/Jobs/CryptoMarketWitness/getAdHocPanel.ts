import { XyoAdhocWitness, XyoPanel, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists, getSigningAccount } from '../../Archivists'

export const getAdHocPanel = (prices: XyoPayload): XyoPanel => {
  console.log('getAdHocPanel: getting account')
  const account = getSigningAccount()
  console.log('getAdHocPanel: getting archive')
  const archive = getArchive()
  console.log('getAdHocPanel: getting archivists')
  const archivists = getArchivists()
  console.log('getAdHocPanel: getting witnesses')
  const witnesses = [new XyoAdhocWitness(prices)]
  console.log('getAdHocPanel: creating panel')
  return new XyoPanel({ account, archive, archivists, witnesses })
}

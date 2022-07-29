import { XyoAdhocWitness, XyoPanel, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists, getSigningAccount } from '../../Archivists'

export const getAdHocPanel = (prices: XyoPayload): XyoPanel => {
  const account = getSigningAccount()
  const archive = getArchive()
  const archivists = getArchivists()
  const witnesses = [new XyoAdhocWitness(prices)]
  return new XyoPanel({ account, archive, archivists, witnesses })
}

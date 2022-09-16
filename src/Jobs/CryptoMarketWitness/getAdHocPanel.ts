import { XyoAdhocWitness, XyoPanel, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists } from '../../Archivists'

export const getAdHocPanel = (prices: XyoPayload): XyoPanel => {
  const archive = getArchive()
  const archivists = getArchivists()
  const witnesses = [new XyoAdhocWitness(prices)]
  return new XyoPanel({ archive, witnesses }, archivists[0])
}

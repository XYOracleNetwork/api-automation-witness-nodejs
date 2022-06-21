import { XyoBoundWitness, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getSigningAccount } from './getSigningAccount'
import { witnessPayload } from './witnessPayload'

export const witnessPayloads = <T extends XyoPayload>(payloads: T[], account = getSigningAccount()): XyoBoundWitness[] => {
  return payloads.map((p) => witnessPayload(p, account))
}

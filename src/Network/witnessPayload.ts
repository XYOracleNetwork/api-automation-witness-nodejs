import { XyoBoundWitness, XyoBoundWitnessBuilder, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { getSigningAccount } from './getSigningAccount'

export const witnessPayload = <T extends XyoPayload>(payload: T): XyoBoundWitness => {
  const account = getSigningAccount()
  return new XyoBoundWitnessBuilder({ inlinePayloads: true }).witness(account).payload(payload).build()
}

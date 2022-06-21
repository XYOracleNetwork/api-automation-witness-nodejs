import { XyoAccount } from '@xyo-network/sdk-xyo-client-js'

export const getSigningAccount = (phrase: string): XyoAccount => {
  return phrase ? new XyoAccount({ phrase }) : XyoAccount.random()
}

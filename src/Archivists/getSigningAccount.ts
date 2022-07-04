import { XyoAccount } from '@xyo-network/sdk-xyo-client-js'

export const getSigningAccount = (phrase = process.env.ACCOUNT_SEED): XyoAccount => {
  return new XyoAccount({ phrase })
}

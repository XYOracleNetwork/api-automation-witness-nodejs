import { XyoAccount } from '@xyo-network/account'

export const getSigningAccount = (phrase = process.env.ACCOUNT_SEED): XyoAccount => {
  return new XyoAccount({ phrase })
}

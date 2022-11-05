import { assertEx } from '@xylabs/assert'
import { XyoAccount } from '@xyo-network/account'

import { fromMnemonic } from './HdWallet'

export const getAccount = (path?: string): XyoAccount => {
  const mnemonic = assertEx(process.env.MNEMONIC, 'Missing mnemonic for wallet creation')
  return fromMnemonic(mnemonic, path)
}

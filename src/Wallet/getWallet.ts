import { assertEx } from '@xylabs/assert'

import { fromMnemonic } from './HdWallet'

export const getWallet = (path?: string) => {
  const mnemonic = assertEx(process.env.MNEMONIC, 'Missing mnemonic for wallet creation')
  return fromMnemonic(mnemonic, path)
}

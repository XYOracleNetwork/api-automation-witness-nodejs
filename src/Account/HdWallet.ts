import { arrayify } from '@ethersproject/bytes'
import { HDNode, mnemonicToSeed } from '@ethersproject/hdnode'
import { computeHmac, SupportedAlgorithm } from '@ethersproject/sha2'
import { toUtf8Bytes } from '@ethersproject/strings'
import { XyoAccount } from '@xyo-network/account'

// "Bitcoin seed"
const MasterSecret = toUtf8Bytes('Bitcoin seed')

export const fromMnemonicTheHardWay = (mnemonic: string): XyoAccount => {
  const seed = mnemonicToSeed(mnemonic)
  const seedArray: Uint8Array = arrayify(seed)
  const hmac: Uint8Array = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray))
  const privateKey = hmac.slice(0, 32)
  const account = new XyoAccount({ privateKey })
  return account
}

export const fromMnemonic = (mnemonic: string, path?: string): XyoAccount => {
  const node = HDNode.fromMnemonic(mnemonic)
  const wallet = path ? node.derivePath(path) : node
  const privateKey = wallet.privateKey
  return new XyoAccount({ privateKey })
}

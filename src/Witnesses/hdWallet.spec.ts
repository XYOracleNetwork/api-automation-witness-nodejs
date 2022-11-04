import { arrayify } from '@ethersproject/bytes'
import { HDNode, mnemonicToSeed } from '@ethersproject/hdnode'
import { computeHmac, SupportedAlgorithm } from '@ethersproject/sha2'
import { toUtf8Bytes } from '@ethersproject/strings'
import { XyoAccount } from '@xyo-network/account'

// "Bitcoin seed"
const MasterSecret = toUtf8Bytes('Bitcoin seed')

const mnemonic =
  'music snack noble scheme invest off disease pulp mountain sting present uncover steak visual bachelor wait please wreck dwarf lecture car excuse seminar educate'

describe('HD Wallet', () => {
  describe('XyoAccount', () => {
    it('public addresses are equal', () => {
      const seed = mnemonicToSeed(mnemonic)
      const seedArray: Uint8Array = arrayify(seed)
      const I: Uint8Array = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray))
      const privateKey = I.slice(0, 32)
      const account = new XyoAccount({ privateKey })
      expect(account).toBeObject()
      const hdNode = HDNode.fromMnemonic(mnemonic)
      expect(hdNode).toBeObject()
      const hdWalletAddress = hdNode.address.toLowerCase().replace('0x', '')
      const xyoWalletAddress = account.addressValue.hex.toLowerCase().replace('0x', '')
      expect(hdWalletAddress).toEqual(xyoWalletAddress)
    })
  })
})

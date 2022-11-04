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
  describe('parent', () => {
    it('public address is equal to XyoAccount', () => {
      // Create HD Wallet from mnemonic
      const hdNode = HDNode.fromMnemonic(mnemonic)
      expect(hdNode).toBeObject()

      // Create XyoAccount from mnemonic private key
      const seed = mnemonicToSeed(mnemonic)
      const seedArray: Uint8Array = arrayify(seed)
      const hmac: Uint8Array = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray))
      const privateKey = hmac.slice(0, 32)
      const account = new XyoAccount({ privateKey })
      expect(account).toBeObject()

      // Compare public addresses from both for equivalence
      const hdWalletAddress = hdNode.address.toLowerCase().replace('0x', '')
      const xyoWalletAddress = account.addressValue.hex.toLowerCase().replace('0x', '')
      expect(hdWalletAddress).toEqual(xyoWalletAddress)
    })
  })
  describe('child', () => {
    it('public address is equal to XyoAccount', () => {
      const parent = HDNode.fromMnemonic(mnemonic)
      const child = parent.derivePath('m/0/4')
      expect(child).toBeObject()
      expect(child.privateKey).toBeString()

      const privateKey = child.privateKey.toLowerCase().replace('0x', '')
      const account = new XyoAccount({ privateKey })

      // Compare public addresses from both for equivalence
      const hdWalletAddress = child.address.toLowerCase().replace('0x', '')
      const xyoWalletAddress = account.addressValue.hex.toLowerCase().replace('0x', '')
      expect(hdWalletAddress).toEqual(xyoWalletAddress)
    })
  })
})

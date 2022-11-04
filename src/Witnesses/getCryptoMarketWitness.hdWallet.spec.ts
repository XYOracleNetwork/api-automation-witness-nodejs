import { HDNode } from '@ethersproject/hdnode'
import { XyoAccount } from '@xyo-network/account'

const phrase =
  'music snack noble scheme invest off disease pulp mountain sting present uncover steak visual bachelor wait please wreck dwarf lecture car excuse seminar educate'

describe('getCryptoMarketWitness', () => {
  describe('HD Wallet', () => {
    it('can derive HD Wallet', () => {
      const account = new XyoAccount({ phrase })
      expect(account).toBeObject()
      const hdNode = HDNode.fromMnemonic(phrase)
      expect(hdNode).toBeObject()
    })
  })
})

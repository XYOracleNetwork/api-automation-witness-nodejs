import { HDNode } from '@ethersproject/hdnode'
import { XyoAccount } from '@xyo-network/account'

describe('getCryptoMarketWitness', () => {
  describe('HD Wallet', () => {
    it('can derive HD Wallet', () => {
      const account = XyoAccount.random()
      const hdNode: HDNode = new HDNode(undefined, account.private.hex, account.public.hex, '', '', 0, 0, '')
      expect(hdNode).toBeObject()
    })
  })
})

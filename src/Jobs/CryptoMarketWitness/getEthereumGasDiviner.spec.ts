import { getEthereumGasDiviner } from './getEthereumGasDiviner'

describe('getEthereumGasDiviner', () => {
  it('gets the getEthereumGasDiviner', async () => {
    const diviner = await getEthereumGasDiviner()
    expect(diviner).toBeObject()
    expect(diviner.query).toBeFunction()
  })
})

import { getProvider } from '../../Providers'
import { getEthereumGasPanel } from './getEthereumGasPanel'

describe('getEthereumGasPanel', () => {
  it('gets panel using supplied provider', () => {
    const panel = getEthereumGasPanel(getProvider())
    expect(panel).toBeTruthy()
  })
  it('gets panel using default provider if no provider supplied', () => {
    const panel = getEthereumGasPanel()
    expect(panel).toBeTruthy()
  })
})

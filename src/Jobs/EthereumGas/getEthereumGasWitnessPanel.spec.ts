import { getProvider } from '../../Providers'
import { getEthereumGasWitnessPanel } from './getEthereumGasWitnessPanel'

describe('getEthereumGasWitnessPanel', () => {
  it('gets panel using supplied provider', () => {
    const panel = getEthereumGasWitnessPanel(getProvider())
    expect(panel).toBeTruthy()
  })
  it('gets panel using default provider if no provider supplied', () => {
    const panel = getEthereumGasWitnessPanel()
    expect(panel).toBeTruthy()
  })
})

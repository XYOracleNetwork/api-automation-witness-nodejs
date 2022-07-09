import { Provider } from '@ethersproject/providers'
import { defaultCoins, defaultCurrencies, XyoCoinGeckoCryptoMarketWitness, XyoUniswapCryptoMarketWitness } from '@xyo-network/cryptomarket-witness'
import {
  UniswapPoolContracts,
  XyoEtherchainEthereumGasWitnessV1,
  XyoEtherchainEthereumGasWitnessV2,
  XyoEtherscanEthereumGasWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'

import { canUseEtherscanProvider, getEtherscanProviderConfig, getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = (provider = getProvider()): XyoWitness[] => {
  const witnesses: XyoWitness[] = [
    new XyoCoinGeckoCryptoMarketWitness({ coins: defaultCoins, currencies: defaultCurrencies, schema: XyoCoinGeckoCryptoMarketWitness.schema }),
    new XyoEtherchainEthereumGasWitnessV1({ schema: XyoEtherchainEthereumGasWitnessV1.schema }),
    new XyoEtherchainEthereumGasWitnessV2({ schema: XyoEtherchainEthereumGasWitnessV2.schema }),
    new XyoUniswapCryptoMarketWitness({ pools: UniswapPoolContracts, schema: XyoUniswapCryptoMarketWitness.schema, targetSchema: XyoUniswapCryptoMarketWitness.schema }, provider),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(new XyoEtherscanEthereumGasWitness({ schema: XyoEtherscanEthereumGasWitness.schema }, apiKey))
  }
  return witnesses
}

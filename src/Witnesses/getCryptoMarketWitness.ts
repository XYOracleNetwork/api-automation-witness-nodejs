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
    new XyoCoinGeckoCryptoMarketWitness({ query: { coins: defaultCoins, currencies: defaultCurrencies, schema: XyoCoinGeckoCryptoMarketWitness.schema } }),
    new XyoEtherchainEthereumGasWitnessV1(),
    new XyoEtherchainEthereumGasWitnessV2(),
    new XyoUniswapCryptoMarketWitness({
      provider,
      query: { pools: UniswapPoolContracts, schema: 'network.xyo.crypto.market.uniswap.query', targetSchema: 'network.xyo.crypto.market.uniswap' },
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(new XyoEtherscanEthereumGasWitness({ apiKey, query: { schema: 'network.xyo.blockchain.ethereum.gas.etherscan.query' } }))
  }
  return witnesses
}

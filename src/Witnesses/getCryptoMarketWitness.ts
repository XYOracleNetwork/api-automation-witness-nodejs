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
  const witnesses: XyoWitness[] = []
  console.log('getCryptoMarketWitness: creating xyoCoinGeckoCryptoMarketWitness')
  const xyoCoinGeckoCryptoMarketWitness = new XyoCoinGeckoCryptoMarketWitness({
    query: {
      coins: defaultCoins,
      currencies: defaultCurrencies,
      schema: 'network.xyo.crypto.market.coingecko.query',
      targetSchema: XyoCoinGeckoCryptoMarketWitness.schema,
    },
  })
  witnesses.push(xyoCoinGeckoCryptoMarketWitness)
  console.log('getCryptoMarketWitness: creating xyoCoinGeckoCryptoMarketWitness')
  const xyoEtherchainEthereumGasWitnessV1 = new XyoEtherchainEthereumGasWitnessV1()
  witnesses.push(xyoEtherchainEthereumGasWitnessV1)
  console.log('getCryptoMarketWitness: creating xyoEtherchainEthereumGasWitnessV2')
  const xyoEtherchainEthereumGasWitnessV2 = new XyoEtherchainEthereumGasWitnessV2()
  witnesses.push(xyoEtherchainEthereumGasWitnessV2)
  console.log('getCryptoMarketWitness: creating xyoUniswapCryptoMarketWitness')
  const xyoUniswapCryptoMarketWitness = new XyoUniswapCryptoMarketWitness({
    provider,
    query: { pools: UniswapPoolContracts, schema: 'network.xyo.crypto.market.uniswap.query', targetSchema: 'network.xyo.crypto.market.uniswap' },
  })
  witnesses.push(xyoUniswapCryptoMarketWitness)
  if (canUseEtherscanProvider()) {
    console.log('getCryptoMarketWitness: creating getEtherscanProviderConfig')
    const apiKey = getEtherscanProviderConfig()
    console.log('getCryptoMarketWitness: creating xyoUniswapCryptoMarketWitness')
    const xyoEtherscanEthereumGasWitness = new XyoEtherscanEthereumGasWitness({
      apiKey,
      query: { schema: 'network.xyo.blockchain.ethereum.gas.etherscan.query', targetSchema: 'network.xyo.blockchain.ethereum.gas.etherscan' },
    })
    witnesses.push(xyoEtherscanEthereumGasWitness)
  }
  console.log('created witnesses')
  return witnesses
}

import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketPayloadSchema,
  XyoCoingeckoCryptoMarketWitness,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  XyoEtherchainEthereumGasWitnessV1,
  XyoEtherchainEthereumGasWitnessV2,
  XyoEtherscanEthereumGasWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { UniswapPoolContracts, XyoUniswapCryptoMarketWitness } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { canUseEtherscanProvider, getEtherscanProviderConfig, getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = (provider = getProvider()): XyoWitness[] => {
  const witnesses: XyoWitness[] = [
    new XyoCoingeckoCryptoMarketWitness({
      query: {
        coins: defaultCoins,
        currencies: defaultCurrencies,
        schema: 'network.xyo.crypto.market.coingecko.query',
        targetSchema: XyoCoingeckoCryptoMarketPayloadSchema,
      },
    }),
    new XyoEtherchainEthereumGasWitnessV1(),
    new XyoEtherchainEthereumGasWitnessV2(),
    new XyoUniswapCryptoMarketWitness({
      provider,
      query: { pools: UniswapPoolContracts, schema: 'network.xyo.crypto.market.uniswap.query', targetSchema: 'network.xyo.crypto.market.uniswap' },
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      new XyoEtherscanEthereumGasWitness({
        apiKey,
        query: { schema: 'network.xyo.blockchain.ethereum.gas.etherscan.query', targetSchema: 'network.xyo.blockchain.ethereum.gas.etherscan' },
      })
    )
  }
  return witnesses
}

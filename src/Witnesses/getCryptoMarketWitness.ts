import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketPayloadSchema,
  XyoCoingeckoCryptoMarketWitness,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  XyoAccount,
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
      account: new XyoAccount(),
      query: {
        coins: defaultCoins,
        currencies: defaultCurrencies,
        schema: 'network.xyo.crypto.market.coingecko.query',
      },
      schema: 'network.xyo.crypto.market.coingecko.config',
      targetSchema: XyoCoingeckoCryptoMarketPayloadSchema,
    }),
    new XyoEtherchainEthereumGasWitnessV1(),
    new XyoEtherchainEthereumGasWitnessV2(),
    new XyoUniswapCryptoMarketWitness({
      account: new XyoAccount(),
      provider,
      query: { pools: UniswapPoolContracts, schema: 'network.xyo.crypto.market.uniswap.query' },
      schema: 'network.xyo.crypto.market.uniswap.config',
      targetSchema: 'network.xyo.crypto.market.uniswap',
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      new XyoEtherscanEthereumGasWitness({
        account: new XyoAccount(),
        apiKey,
        query: { schema: 'network.xyo.blockchain.ethereum.gas.etherscan.query' },
        schema: 'network.xyo.blockchain.ethereum.gas.etherscan.config',
        targetSchema: 'network.xyo.blockchain.ethereum.gas.etherscan',
      }),
    )
  }
  return witnesses
}

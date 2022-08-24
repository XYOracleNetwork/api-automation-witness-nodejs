import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketPayloadSchema,
  XyoCoingeckoCryptoMarketWitness,
  XyoCoingeckoCryptoMarketWitnessConfigSchema,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  XyoAccount,
  XyoEtherchainEthereumGasWitnessV1,
  XyoEtherchainEthereumGasWitnessV2,
  XyoEtherscanEthereumGasWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import {
  UniswapPoolContracts,
  XyoUniswapCryptoMarketPayloadSchema,
  XyoUniswapCryptoMarketWitness,
  XyoUniswapCryptoMarketWitnessConfigSchema,
} from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { canUseEtherscanProvider, getEtherscanProviderConfig, getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = (provider = getProvider()): XyoWitness[] => {
  const witnesses: XyoWitness[] = [
    new XyoCoingeckoCryptoMarketWitness({
      account: new XyoAccount(),
      coins: defaultCoins,
      currencies: defaultCurrencies,
      schema: XyoCoingeckoCryptoMarketWitnessConfigSchema,
      targetSchema: XyoCoingeckoCryptoMarketPayloadSchema,
    }),
    new XyoEtherchainEthereumGasWitnessV1(),
    new XyoEtherchainEthereumGasWitnessV2(),
    new XyoUniswapCryptoMarketWitness({
      account: new XyoAccount(),
      pools: UniswapPoolContracts,
      provider,
      schema: XyoUniswapCryptoMarketWitnessConfigSchema,
      targetSchema: XyoUniswapCryptoMarketPayloadSchema,
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      new XyoEtherscanEthereumGasWitness({
        account: new XyoAccount(),
        apiKey,
        schema: 'network.xyo.blockchain.ethereum.gas.etherscan.witness.config',
        targetSchema: 'network.xyo.blockchain.ethereum.gas.etherscan',
      }),
    )
  }
  return witnesses
}

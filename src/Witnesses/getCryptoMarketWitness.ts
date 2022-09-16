import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketSchema,
  XyoCoingeckoCryptoMarketWitness,
  XyoCoingeckoCryptoMarketWitnessConfigSchema,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  XyoEtherchainEthereumGasWitnessV1,
  XyoEthereumGasEtherchainV1Schema,
  XyoEthereumGasEtherchainV1WitnessConfigSchema,
} from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import {
  XyoEtherchainEthereumGasWitnessV2,
  XyoEthereumGasEtherchainV2Schema,
  XyoEthereumGasEtherchainV2WitnessConfigSchema,
} from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import {
  XyoEthereumGasEtherscanSchema,
  XyoEthereumGasEtherscanWitnessConfigSchema,
  XyoEtherscanEthereumGasWitness,
} from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoWitness } from '@xyo-network/sdk-xyo-client-js'
import {
  UniswapPoolContracts,
  XyoUniswapCryptoMarketSchema,
  XyoUniswapCryptoMarketWitness,
  XyoUniswapCryptoMarketWitnessConfigSchema,
} from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { canUseEtherscanProvider, getEtherscanProviderConfig, getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = (provider = getProvider()): XyoWitness[] => {
  const witnesses: XyoWitness[] = [
    new XyoCoingeckoCryptoMarketWitness({
      coins: defaultCoins,
      currencies: defaultCurrencies,
      schema: XyoCoingeckoCryptoMarketWitnessConfigSchema,
      targetSchema: XyoCoingeckoCryptoMarketSchema,
    }),
    new XyoEtherchainEthereumGasWitnessV1({
      schema: XyoEthereumGasEtherchainV1WitnessConfigSchema,
      targetSchema: XyoEthereumGasEtherchainV1Schema,
    }),
    new XyoEtherchainEthereumGasWitnessV2({
      schema: XyoEthereumGasEtherchainV2WitnessConfigSchema,
      targetSchema: XyoEthereumGasEtherchainV2Schema,
    }),
    new XyoUniswapCryptoMarketWitness({
      pools: UniswapPoolContracts,
      provider,
      schema: XyoUniswapCryptoMarketWitnessConfigSchema,
      targetSchema: XyoUniswapCryptoMarketSchema,
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      new XyoEtherscanEthereumGasWitness({
        apiKey,
        schema: XyoEthereumGasEtherscanWitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherscanSchema,
      }),
    )
  }
  return witnesses
}

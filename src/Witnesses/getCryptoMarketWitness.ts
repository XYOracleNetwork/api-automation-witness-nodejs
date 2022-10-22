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

export const getCryptoMarketWitness: WitnessProvider<Provider> = async (provider = getProvider()): Promise<XyoWitness[]> => {
  const witnesses: XyoWitness[] = [
    await XyoCoingeckoCryptoMarketWitness.create({
      config: {
        coins: defaultCoins,
        currencies: defaultCurrencies,
        schema: XyoCoingeckoCryptoMarketWitnessConfigSchema,
        targetSchema: XyoCoingeckoCryptoMarketSchema,
      },
    }),
    await XyoEtherchainEthereumGasWitnessV1.create({
      config: {
        schema: XyoEthereumGasEtherchainV1WitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherchainV1Schema,
      },
    }),
    await XyoEtherchainEthereumGasWitnessV2.create({
      config: {
        schema: XyoEthereumGasEtherchainV2WitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherchainV2Schema,
      },
    }),
    await XyoUniswapCryptoMarketWitness.create({
      config: {
        pools: UniswapPoolContracts,
        schema: XyoUniswapCryptoMarketWitnessConfigSchema,
        targetSchema: XyoUniswapCryptoMarketSchema,
      },
      provider,
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      await XyoEtherscanEthereumGasWitness.create({
        config: {
          apiKey,
          schema: XyoEthereumGasEtherscanWitnessConfigSchema,
          targetSchema: XyoEthereumGasEtherscanSchema,
        },
      }),
    )
  }
  return witnesses
}

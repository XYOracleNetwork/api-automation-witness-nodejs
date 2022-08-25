import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketPayloadSchema,
  XyoCoingeckoCryptoMarketWitness,
  XyoCoingeckoCryptoMarketWitnessConfigSchema,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  XyoEtherchainEthereumGasWitnessV1,
  XyoEthereumGasEtherchainV1PayloadSchema,
  XyoEthereumGasEtherchainV1WitnessConfigSchema,
} from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import {
  XyoEtherchainEthereumGasWitnessV2,
  XyoEthereumGasEtherchainV2PayloadSchema,
  XyoEthereumGasEtherchainV2WitnessConfigSchema,
} from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import {
  XyoEthereumGasEtherscanPayloadSchema,
  XyoEthereumGasEtherscanWitnessConfigSchema,
  XyoEtherscanEthereumGasWitness,
} from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoAccount, XyoWitness } from '@xyo-network/sdk-xyo-client-js'
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
    new XyoEtherchainEthereumGasWitnessV1({
      account: new XyoAccount(),
      schema: XyoEthereumGasEtherchainV1WitnessConfigSchema,
      targetSchema: XyoEthereumGasEtherchainV1PayloadSchema,
    }),
    new XyoEtherchainEthereumGasWitnessV2({
      account: new XyoAccount(),
      schema: XyoEthereumGasEtherchainV2WitnessConfigSchema,
      targetSchema: XyoEthereumGasEtherchainV2PayloadSchema,
    }),
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
        schema: XyoEthereumGasEtherscanWitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherscanPayloadSchema,
      }),
    )
  }
  return witnesses
}

import { Provider } from '@ethersproject/providers'
import {
  defaultCoins,
  defaultCurrencies,
  XyoCoingeckoCryptoMarketSchema,
  XyoCoingeckoCryptoMarketWitness,
  XyoCoingeckoCryptoMarketWitnessConfigSchema,
} from '@xyo-network/coingecko-crypto-market-payload-plugin'
import {
  UniswapPoolContracts,
  XyoUniswapCryptoMarketSchema,
  XyoUniswapCryptoMarketWitness,
  XyoUniswapCryptoMarketWitnessConfigSchema,
} from '@xyo-network/uniswap-crypto-market-payload-plugin'
import { XyoWitness } from '@xyo-network/witness'

import { getAccount, WalletPaths } from '../Account'
import { getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = async (provider = getProvider()): Promise<XyoWitness[]> => {
  const witnesses: XyoWitness[] = [
    await XyoCoingeckoCryptoMarketWitness.create({
      account: getAccount(WalletPaths.XyoCoingeckoCryptoMarketWitness),
      config: {
        coins: defaultCoins,
        currencies: defaultCurrencies,
        schema: XyoCoingeckoCryptoMarketWitnessConfigSchema,
        targetSchema: XyoCoingeckoCryptoMarketSchema,
      },
    }),
    await XyoUniswapCryptoMarketWitness.create({
      account: getAccount(WalletPaths.XyoUniswapCryptoMarketWitness),
      config: {
        pools: UniswapPoolContracts,
        schema: XyoUniswapCryptoMarketWitnessConfigSchema,
        targetSchema: XyoUniswapCryptoMarketSchema,
      },
      provider,
    }),
  ]
  return witnesses
}

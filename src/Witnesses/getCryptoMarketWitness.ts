import { Provider } from '@ethersproject/providers'
import { defaultCoins, defaultCurrencies, UniswapPoolContracts, XyoCoinGeckoCryptoMarketWitness, XyoUniswapCryptoMarketWitness } from '@xyo-network/cryptomarket-witness'
import { XyoWitness } from '@xyo-network/sdk-xyo-client-js'

import { getInfuraProvider } from './getInfuraProvider'
import { WitnessProvider } from './WitnessProvider'

export const getCryptoMarketWitness: WitnessProvider<Provider> = (provider = getInfuraProvider()): XyoWitness[] => {
  return [
    new XyoUniswapCryptoMarketWitness({ pools: UniswapPoolContracts, schema: XyoUniswapCryptoMarketWitness.schema, targetSchema: XyoUniswapCryptoMarketWitness.schema }, provider),
    new XyoCoinGeckoCryptoMarketWitness({ coins: defaultCoins, currencies: defaultCurrencies, schema: XyoCoinGeckoCryptoMarketWitness.schema }),
  ]
}

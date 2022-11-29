import { Provider } from '@ethersproject/providers'
import {
  XyoEthereumGasBlocknativeSchema,
  XyoEthereumGasBlocknativeWitness,
  XyoEthereumGasBlocknativeWitnessConfigSchema,
} from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
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
  XyoEthereumGasEthersSchema,
  XyoEthereumGasEthersWitness,
  XyoEthereumGasEthersWitnessConfigSchema,
} from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import {
  XyoEthereumGasEtherscanSchema,
  XyoEthereumGasEtherscanWitness,
  XyoEthereumGasEtherscanWitnessConfigSchema,
} from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import {
  XyoEthereumGasEthgasstationSchema,
  XyoEthereumGasEthgasstationWitness,
  XyoEthereumGasEthgasstationWitnessConfigSchema,
} from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { AbstractWitness } from '@xyo-network/witness'

import { getAccount, WalletPaths } from '../Account'
import { canUseEtherscanProvider, getEtherscanProviderConfig, getProvider } from '../Providers'
import { WitnessProvider } from './WitnessProvider'

export const getEthereumGasWitness: WitnessProvider<Provider> = async (provider = getProvider()): Promise<AbstractWitness[]> => {
  const witnesses: AbstractWitness[] = [
    await XyoEthereumGasBlocknativeWitness.create({
      account: getAccount(WalletPaths.XyoEthereumGasBlocknativeWitness),
      config: {
        schema: XyoEthereumGasBlocknativeWitnessConfigSchema,
        targetSchema: XyoEthereumGasBlocknativeSchema,
      },
    }),
    await XyoEtherchainEthereumGasWitnessV1.create({
      account: getAccount(WalletPaths.XyoEtherchainEthereumGasWitnessV1),
      config: {
        schema: XyoEthereumGasEtherchainV1WitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherchainV1Schema,
      },
    }),
    await XyoEtherchainEthereumGasWitnessV2.create({
      account: getAccount(WalletPaths.XyoEtherchainEthereumGasWitnessV2),
      config: {
        schema: XyoEthereumGasEtherchainV2WitnessConfigSchema,
        targetSchema: XyoEthereumGasEtherchainV2Schema,
      },
    }),
    await XyoEthereumGasEthersWitness.create({
      account: getAccount(WalletPaths.XyoEthereumGasEthersWitness),
      config: {
        schema: XyoEthereumGasEthersWitnessConfigSchema,
        targetSchema: XyoEthereumGasEthersSchema,
      },
      provider,
    }),
    await XyoEthereumGasEthgasstationWitness.create({
      account: getAccount(WalletPaths.XyoEthereumGasEthgasstationWitness),
      config: {
        schema: XyoEthereumGasEthgasstationWitnessConfigSchema,
        targetSchema: XyoEthereumGasEthgasstationSchema,
      },
    }),
  ]
  if (canUseEtherscanProvider()) {
    const apiKey = getEtherscanProviderConfig()
    witnesses.push(
      await XyoEthereumGasEtherscanWitness.create({
        account: getAccount(WalletPaths.XyoEtherscanEthereumGasWitness),
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

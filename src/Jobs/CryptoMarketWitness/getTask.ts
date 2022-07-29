import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import {
  XyoAdhocWitness,
  XyoCryptoMarketCoinGeckoPayload,
  XyoCryptoMarketUniswapPayload,
  XyoPanel,
  XyoPayload,
  XyoPayloadBase,
  XyoPayloadBuilder,
} from '@xyo-network/sdk-xyo-client-js'

import { getArchive, getArchivists, getSigningAccount } from '../../Archivists'
import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'

const uniswapSchema = 'network.xyo.crypto.market.uniswap'
const coingeckoSchema = 'network.xyo.crypto.market.coingecko'

const isUniswapPayload = (p: XyoPayloadBase): p is XyoCryptoMarketUniswapPayload => p.schema === uniswapSchema
const isCoingeckoPayload = (p: XyoPayloadBase): p is XyoCryptoMarketCoinGeckoPayload => p.schema === coingeckoSchema

const schema = 'network.xyo.crypto.asset'

interface CryptoAsset extends Record<string, unknown> {
  xyo?: {
    value?: {
      usd?: number
    }
  }
}

const calculatePrice = (uniswapPayload: XyoCryptoMarketUniswapPayload | undefined, coingeckoPayload: XyoCryptoMarketCoinGeckoPayload | undefined): XyoPayload => {
  const xyoUsdt = uniswapPayload?.pairs
    .map((p) => p.tokens)
    .filter((t) => t.some((t) => t.symbol.toLowerCase() === 'xyo'))
    ?.find((t) => t.some((t) => t.symbol.toLowerCase() === 'usdt'))
    ?.map((x) => x)
    ?.pop()?.value
  const xyoUsd = coingeckoPayload?.assets?.xyo?.usd
  const fields: CryptoAsset = {}
  if (xyoUsdt || xyoUsd) {
    const usd = xyoUsdt && xyoUsd ? (xyoUsdt + xyoUsd) / 2 : xyoUsdt || xyoUsd
    fields.xyo = { value: { usd } }
  }
  return new XyoPayloadBuilder({ schema }).fields(fields).build()
}

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      const result = await getCryptoMarketPanel().report()
      const uniswapPayload = result._payloads?.filter(isUniswapPayload)?.pop()
      const coingeckoPayload = result._payloads?.filter(isCoingeckoPayload)?.pop()
      const price = calculatePrice(uniswapPayload, coingeckoPayload)
      logger.log('Witnessed Crypto Prices')
      logger.log('Calculating Crypto Prices')
      const account = getSigningAccount()
      const archive = getArchive()
      const archivists = getArchivists()
      const witnesses = [new XyoAdhocWitness(price)]
      await new XyoPanel({ account, archive, archivists, witnesses }).report()
      logger.log('Calculated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}

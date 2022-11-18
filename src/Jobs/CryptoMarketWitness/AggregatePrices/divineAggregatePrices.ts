import { assertEx } from '@xylabs/assert'
import { exists } from '@xylabs/exists'
import { XyoCoingeckoCryptoMarketPayload, XyoCoingeckoCryptoMarketSchema } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { XyoPayload } from '@xyo-network/payload'
import { XyoUniswapCryptoMarketPayload, XyoUniswapCryptoMarketSchema } from '@xyo-network/uniswap-crypto-market-payload-plugin'

import { getCryptoMarketAssetDiviner } from '../getCryptoMarketAssetDiviner'
import { getAggregatePricePanel } from './getAggregatePricePanel'

const isUniswapPayload = (p: XyoPayload): p is XyoUniswapCryptoMarketPayload => p.schema === XyoUniswapCryptoMarketSchema
const isCoingeckoPayload = (p: XyoPayload): p is XyoCoingeckoCryptoMarketPayload => p.schema === XyoCoingeckoCryptoMarketSchema

export const divineAggregatePrices = async (payloads: XyoPayload[]) => {
  const coinGeckoPayload = payloads?.filter(isCoingeckoPayload)?.pop()
  const uniswapPayload = payloads?.filter(isUniswapPayload)?.pop()
  const results = [coinGeckoPayload, uniswapPayload].filter(exists)
  const diviner = await getCryptoMarketAssetDiviner()
  const answer = (await new XyoDivinerWrapper(diviner).divine(results)).pop()
  const prices = assertEx(answer, 'Empty XyoCryptoMarketAssetPayload response from diviner')
  const panel = await getAggregatePricePanel(prices)
  await panel.report()
}

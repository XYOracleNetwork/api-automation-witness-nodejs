import { PartialRecord } from '@xyo-network/cryptomarket-witness'

import { Currency } from './Currency'
import { Token } from './Token'

export type ValueBasis = PartialRecord<Currency | Token, string | undefined>

import { Currency } from './Currency'
import { PartialRecord } from './PartialRecord'
import { Token } from './Token'

export type ValueBasis = PartialRecord<Currency | Token, string | undefined>

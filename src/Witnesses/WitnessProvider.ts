import { XyoWitness } from '@xyo-network/sdk-xyo-client-js'

export type WitnessProvider<T> = (opts?: T) => XyoWitness[]

import { XyoPanel } from '@xyo-network/sdk-xyo-client-js'

export type PanelProvider<T> = (opts?: T) => XyoPanel

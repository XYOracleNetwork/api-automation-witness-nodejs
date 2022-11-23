import { XyoPanel } from '@xyo-network/panel'

export type PanelProvider<T> = (opts?: T) => Promise<XyoPanel>

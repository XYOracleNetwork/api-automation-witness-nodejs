import { getLogger } from './getLogger'
import { Logger } from './Logger'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

/**
 * Static instance to prevent multiple instances of the same logger
 * with the same config
 */
let defaultLogger: WrappedWinstonLogger
export const getDefaultLogger = (): Logger => {
  if (defaultLogger) return defaultLogger
  return getLogger()
}

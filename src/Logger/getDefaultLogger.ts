import { createLogger, format, transports } from 'winston'

import { Logger } from './Logger'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

export const getDefaultLogger = (level = 'info'): Logger => {
  const logger = createLogger({
    defaultMeta: { service: 'user-service' },
    format: format.json(),
    level,
    transports: [new transports.Console({ format: format.simple() })],
  })
  return new WrappedWinstonLogger(logger)
}

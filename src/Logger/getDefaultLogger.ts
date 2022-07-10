import { createLogger, format, transports } from 'winston'

import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './WinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

export const getDefaultLogger = (minimumVerbosity: LoggerVerbosity = 'info'): Logger => {
  const level = toWinstonVerbosity(minimumVerbosity)
  const logger = createLogger({
    defaultMeta: { service: 'user-service' },
    format: format.json(),
    level,
    transports: [new transports.Console({ format: format.simple() })],
  })
  return new WrappedWinstonLogger(logger)
}

import { createLogger, format, transports } from 'winston'

import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const consoleLogFormat = format.combine(format.label(), format.simple(), format.timestamp())

const transportToUse = new transports.Console({ format: format.cli() })

export const getDefaultLogger = (minimumVerbosity: LoggerVerbosity = 'info'): Logger => {
  const level = toWinstonVerbosity(minimumVerbosity)
  const logger = createLogger({
    defaultMeta: { service: 'api-automation-witness' },
    format: format.json(),
    handleRejections: true,
    level,
    rejectionHandlers: [transportToUse],
    transports: [transportToUse],
  })
  return new WrappedWinstonLogger(logger)
}

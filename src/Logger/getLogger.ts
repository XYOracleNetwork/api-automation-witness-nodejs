import { createLogger, transports } from 'winston'

import { logFormatLocalDev, logFormatStructured } from './LogFormats'
import { Logger } from './Logger'
import { LoggerMeta } from './LoggerMeta'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const { Console } = transports

const format = process.env.NODE_ENV === 'development' ? logFormatLocalDev : logFormatStructured
const transport = new Console()

// TODO: Make dynamic and pass in for re-use
const defaultAutomationWitnessMeta: LoggerMeta = { service: 'api-automation-witness' }
const handleRejections = true

export const getLogger = (minimumVerbosity: LoggerVerbosity = 'info', defaultMeta: LoggerMeta = defaultAutomationWitnessMeta): Logger => {
  const level = toWinstonVerbosity(minimumVerbosity)
  const logger = createLogger({
    defaultMeta,
    format,
    handleRejections,
    level,
    rejectionHandlers: [transport],
    transports: [transport],
  })
  return new WrappedWinstonLogger(logger)
}

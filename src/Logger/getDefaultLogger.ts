import { createLogger, format, transports } from 'winston'

import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const { align, colorize, combine, timestamp, printf } = format
const { Console } = transports

const localDevFormat = combine(
  colorize(),
  timestamp(),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
)

// TODO: Change to structured logs in production
const logFormat = process.env.NODE_ENV === 'production' ? localDevFormat : localDevFormat
const transport = new Console()

// TODO: Make dynamic and pass in for re-use
const defaultMeta = { service: 'api-automation-witness' }

export const getDefaultLogger = (minimumVerbosity: LoggerVerbosity = 'info'): Logger => {
  const level = toWinstonVerbosity(minimumVerbosity)
  const logger = createLogger({
    defaultMeta,
    format: logFormat,
    handleRejections: true,
    level,
    rejectionHandlers: [transport],
    transports: [transport],
  })
  return new WrappedWinstonLogger(logger)
}

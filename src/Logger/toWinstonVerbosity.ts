import { LoggerVerbosity } from './LoggerVerbosity'
import { WinstonVerbosity } from './WinstonVerbosity'

export const toWinstonVerbosity = (loggerVerbosity: LoggerVerbosity): WinstonVerbosity => {
  return loggerVerbosity === 'all' ? 'silly' : loggerVerbosity
}

import { LoggerVerbosity } from './LoggerVerbosity'

/**
 * Follows NPM log levels
 * https://docs.npmjs.com/cli/v8/using-npm/logging#loglevel
 */
export type WinstonVerbosity = 'silent' | 'error' | 'warn' | 'notice' | 'http' | 'timing' | 'info' | 'verbose' | 'silly'

export const toWinstonVerbosity = (loggerVerbosity: LoggerVerbosity): WinstonVerbosity => {
  return loggerVerbosity === 'debug' ? 'silly' : loggerVerbosity
}

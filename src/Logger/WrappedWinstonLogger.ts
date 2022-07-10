import { Logger as Winston } from 'winston'

import { LogFunction, Logger } from './Logger'

/**
 * Wrap Winston logger methods to adapt to familiar
 * console logging methods
 */
export class WrappedWinstonLogger implements Logger {
  debug: LogFunction = this.winston.debug
  error: LogFunction = this.winston.error
  info: LogFunction = this.winston.info
  log: LogFunction = this.winston.info
  warn: LogFunction = this.winston.warn
  constructor(protected readonly winston: Winston) {}
}

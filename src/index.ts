import { tryParseInt, WrappedWinstonLogger } from '@xylabs/express'
import { automationWitness } from '@xyo-network/automation-witness-server'
import { config } from 'dotenv'
import Rollbar from 'rollbar'
import winston from 'winston'
import Transport from 'winston-transport'

import pkg from '../package.json' with { type: 'json' }

config()

var rollbar = new Rollbar({
  accessToken: 'afd5c4a1a8024607a8460d57d73f8cb0',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: { code_version: pkg.version },
})

export class RollbarTransport extends Transport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info))

    switch (info.level) {
      case 'debug': {
        rollbar.debug(info.message, info.meta || {})
        break
      }
      case 'log': {
        rollbar.log(info.message, info.meta || {})
        break
      }
      case 'info': {
        rollbar.info(info.message, info.meta || {})
        break
      }
      case 'warn': {
        rollbar.warning(info.message, info.meta || {})
        break
      }
      case 'error': {
        rollbar.error(info.message, info.meta || {})
        break
      }
      case 'critical': {
        rollbar.critical(info.message, info.meta || {})
        break
      }
      default: {
        rollbar.log(info.message, info.meta || {})
        break
      }
    }

    callback()
  }
}

globalThis.xy = globalThis.xy ?? {}

globalThis.xy.defaultLogger = new WrappedWinstonLogger(winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new RollbarTransport(),
  ],
}))

void automationWitness(tryParseInt(process.env.APP_PORT))

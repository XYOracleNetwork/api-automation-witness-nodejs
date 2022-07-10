import { Logger } from 'winston'

import { getDefaultLogger } from './getDefaultLogger'

type LoggerKey = keyof Logger
const loggerKeys: LoggerKey[] = [
  // In decreasing severity
  'error',
  'warn',
  'log',
  'info',
  'debug',
]

describe('getDefaultLogger', () => {
  it('providers a default logger', () => {
    const logger = getDefaultLogger()
    expect(logger).toBeObject()
  })
  describe('verbosity', () => {
    it.each(loggerKeys)('can log with %s verbosity', (verbosity: LoggerKey) => {
      const logger = getDefaultLogger('silly')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ugly = logger as any
      const logMethod = ugly[verbosity]
      expect(logMethod).toBeFunction()
      logMethod('test')
    })
  })
})

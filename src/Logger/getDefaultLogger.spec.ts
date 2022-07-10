/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from 'winston'

import { getDefaultLogger } from './getDefaultLogger'

type LoggerKey = keyof Logger
const loggerKeys: LoggerKey[] = ['error', 'warn', 'log', 'info', 'debug']

describe('getDefaultLogger', () => {
  it('providers a default logger', () => {
    const logger = getDefaultLogger()
    expect(logger).toBeObject()
  })
  describe('verbosity', () => {
    let stdOutMock: jest.SpyInstance<boolean, [str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined]>
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stdOutMock = jest.spyOn(process.stdout, 'write').mockImplementation(jest.fn as any)
    })
    afterEach(() => {
      stdOutMock.mockRestore()
    })
    it.each(loggerKeys)('logs log with %s verbosity', (verbosity: LoggerKey) => {
      const logger = getDefaultLogger('debug')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const logMethod = (logger as any)[verbosity]
      expect(logMethod).toBeFunction()
      logMethod('log from unit test')
      expect(stdOutMock).toHaveBeenCalledOnce()
    })
  })
})

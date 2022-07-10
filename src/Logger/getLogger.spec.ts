/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from 'winston'

import { getLogger } from './getLogger'

type LoggerKey = keyof Logger
const loggerKeys: LoggerKey[] = ['error', 'warn', 'log', 'info', 'debug']

describe('getLogger', () => {
  describe('verbosity', () => {
    let stdErrMock: jest.SpyInstance<boolean, [str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined]>
    let stdOutMock: jest.SpyInstance<boolean, [str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined]>
    let consoleLogMock: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stdErrMock = jest.spyOn(process.stderr, 'write').mockImplementation(jest.fn as any)
      stdOutMock = jest.spyOn(process.stdout, 'write').mockImplementation(jest.fn as any)
      consoleLogMock = jest.spyOn(console, 'log').mockImplementation(jest.fn)
    })
    afterEach(() => {
      stdErrMock.mockRestore()
      stdOutMock.mockRestore()
      consoleLogMock.mockRestore()
    })
    it.each(loggerKeys)('logs log with %s verbosity', (verbosity: LoggerKey) => {
      const logger = getLogger('all')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const logMethod = (logger as any)[verbosity]
      expect(logMethod).toBeFunction()
      logMethod(`${new String(verbosity)} log from unit test`)
    })
  })
})

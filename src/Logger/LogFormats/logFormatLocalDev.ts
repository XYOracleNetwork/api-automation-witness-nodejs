import { format } from 'winston'

const { colorize, combine, timestamp, printf } = format

export const logFormatLocalDev = combine(
  colorize(),
  timestamp(),
  printf((info) => `[${info.timestamp} ${info.level}] ${info.message}`)
)

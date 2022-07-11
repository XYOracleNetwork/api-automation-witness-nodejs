import { format } from 'winston'

const { combine, timestamp, json } = format

export const logFormatStructured = combine(timestamp(), json())

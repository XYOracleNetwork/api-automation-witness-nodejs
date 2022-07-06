import { DateTime } from 'luxon'

export interface Job {
  // eslint-disable-next-line @typescript-eslint/ban-types
  addCallback(callback: Function): void
  lastDate(): Date
  nextDate(): DateTime
  nextDates(i?: number): DateTime | DateTime[]
  // setTime(time: CronTime): void
  start(): void
  stop(): void
}

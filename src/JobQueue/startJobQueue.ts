import { Agenda } from 'agenda'

export const startJobQueue = async (jobQueue: Agenda) => {
  await jobQueue.start()
}

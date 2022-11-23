import { Job, Task } from '../../Model'
import { getTask } from './getTask'

const name = 'ethereumGasWitness'

export const getJob = (): Job => {
  const schedule: string = process.env.CRYPTO_MARKET_WITNESS_JOB_SCHEDULE || '10 minutes'
  const task: Task = getTask()
  return { name, schedule, task }
}

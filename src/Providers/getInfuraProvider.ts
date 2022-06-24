import { InfuraProvider, Provider } from '@ethersproject/providers'
import { assertEx } from '@xylabs/sdk-js'

let instance: InfuraProvider | undefined = undefined

const pollingIntervalMs = 1000 * 60 * 5

export const getInfuraProvider = (): Provider => {
  if (instance) return instance
  const projectId = assertEx(process.env.INFURA_PROJECT_ID)
  const projectSecret = assertEx(process.env.INFURA_PROJECT_SECRET)
  instance = new InfuraProvider('homestead', { projectId, projectSecret })
  instance.pollingInterval = pollingIntervalMs
  instance.polling = false
  return instance
}

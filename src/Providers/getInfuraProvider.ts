import { InfuraProvider, Provider } from '@ethersproject/providers'
import { assertEx } from '@xylabs/sdk-js'

let instance: InfuraProvider | undefined = undefined

const pollingIntervalMs = 1000 * 60 * 5

export interface InfuraProviderConfig {
  projectId: string
  projectSecret: string
}

export const getInfuraProvider = (): Provider => {
  if (instance) return instance
  const config = getProviderConfig()
  instance = new InfuraProvider('homestead', config)
  instance.pollingInterval = pollingIntervalMs
  instance.polling = false
  return instance
}

export const canUseProvider = (): boolean => {
  return process.env.INFURA_PROJECT_ID && process.env.INFURA_PROJECT_SECRET ? true : false
}

export const getProviderConfig = (): InfuraProviderConfig => {
  const projectId = assertEx(process.env.INFURA_PROJECT_ID)
  const projectSecret = assertEx(process.env.INFURA_PROJECT_SECRET)
  return { projectId, projectSecret }
}

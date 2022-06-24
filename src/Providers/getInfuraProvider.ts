import { InfuraProvider, Provider } from '@ethersproject/providers'
import { assertEx } from '@xylabs/sdk-js'

let instance: Provider | undefined = undefined

export const getInfuraProvider = (): Provider => {
  if (instance) return instance
  const projectId = assertEx(process.env.INFURA_PROJECT_ID)
  const projectSecret = assertEx(process.env.INFURA_PROJECT_SECRET)
  instance = new InfuraProvider('homestead', { projectId, projectSecret })
  return instance
}

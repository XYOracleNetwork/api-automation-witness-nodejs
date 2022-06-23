import { InfuraProvider, Provider } from '@ethersproject/providers'

const projectId = process.env.INFURA_PROJECT_ID
const projectSecret = process.env.INFURA_PROJECT_SECRET
const instance =
  projectId && projectSecret
    ? new InfuraProvider('homestead', {
        projectId,
        projectSecret,
      })
    : new InfuraProvider()

export const getInfuraProvider = (): Provider => {
  return instance
}

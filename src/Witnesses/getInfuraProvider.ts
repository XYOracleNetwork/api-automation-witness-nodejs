import { InfuraProvider, Provider } from '@ethersproject/providers'

export const getInfuraProvider = (): Provider => {
  const projectId = process.env.INFURA_PROJECT_ID
  const projectSecret = process.env.INFURA_PROJECT_SECRET
  return projectId && projectSecret
    ? new InfuraProvider('homestead', {
        projectId,
        projectSecret,
      })
    : new InfuraProvider()
}

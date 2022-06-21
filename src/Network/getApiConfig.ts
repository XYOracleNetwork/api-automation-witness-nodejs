import { XyoApiConfig } from '@xyo-network/sdk-xyo-client-js'

export const getApiConfig = (): XyoApiConfig => {
  return {
    apiDomain: process.env.API_DOMAIN || 'https://beta.api.archivist.xyo.network',
    apiKey: process.env.API_KEY || undefined,
  }
}

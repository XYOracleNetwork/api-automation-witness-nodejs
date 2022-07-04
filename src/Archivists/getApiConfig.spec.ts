import { getApiConfig } from './getApiConfig'

describe('getApiConfig', () => {
  it('returns the API config from the ENV', () => {
    const config = getApiConfig()
    expect(config).toBeTruthy()
    expect(config.apiDomain).toBeDefined()
  })
})

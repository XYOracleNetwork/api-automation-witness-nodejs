import { getArchive } from './getArchive'

describe('getArchive', () => {
  it('returns the archive from the ENV or temp', () => {
    const archive = getArchive()
    expect(archive).toBeTruthy()
  })
})

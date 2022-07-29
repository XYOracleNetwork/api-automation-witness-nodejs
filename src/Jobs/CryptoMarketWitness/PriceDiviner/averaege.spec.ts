import { average } from './average'

describe('average', () => {
  it('averages numbers', () => {
    expect(average(1, 2, 3)).toBe(2)
  })
  it('handles single value', () => {
    expect(average(1)).toBe(1)
  })
  it('handles no values', () => {
    expect(average()).toBe(undefined)
  })
  it('handles undefined values', () => {
    expect(average(1, undefined, 3)).toBe(2)
  })
})

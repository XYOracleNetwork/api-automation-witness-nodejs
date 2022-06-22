import supertest, { SuperTest, Test } from 'supertest'

import { getApp } from '../server'

test('Must have ACCOUNT_SEED ENV VAR defined', () => {
  expect(process.env.ACCOUNT_SEED).toBeTruthy()
})

// const request = supertest(getApp())

export const getAutomationWitness = (): SuperTest<Test> => {
  return supertest(getApp())
}

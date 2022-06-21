import supertest, { SuperTest, Test } from 'supertest'

import { getApp } from '../server'

test('Must have API_KEY ENV VAR defined', () => {
  expect(process.env.API_KEY).toBeTruthy()
})

const request = supertest(getApp())

export const getAutomationWitness = (): SuperTest<Test> => {
  return supertest(getApp())
}

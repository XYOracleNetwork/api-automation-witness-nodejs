test('Must have API_KEY ENV VAR defined', () => {
  expect(process.env.API_KEY).toBeTruthy()
})

const request = supertest(getApp())


export const getWitness = (): SuperTest<Test> => {
  return supertest(getApp())
}

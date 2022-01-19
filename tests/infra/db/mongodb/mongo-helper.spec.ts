import env from '@/main/config/env'
import { MongoHelper as sut } from '@/infra/db'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let anyCollection = await sut.getCollection('any')
    expect(anyCollection).toBeTruthy()
    await sut.disconnect()
    anyCollection = await sut.getCollection('any')
    expect(anyCollection).toBeTruthy()
  })
})

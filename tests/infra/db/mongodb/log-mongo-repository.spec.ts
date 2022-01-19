import env from '@/main/config/env'
import { LogMongoRepository, MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorColletction: Collection
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorColletction = await MongoHelper.getCollection('errors')
    await errorColletction.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorColletction.countDocuments()
    expect(count).toBe(1)
  })
})

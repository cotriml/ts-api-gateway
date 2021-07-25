import env from '@/main/config/env'
import { MongoHelper, ServiceMongoRepository } from '@/infra/db'
import { mockAddServiceParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

let serviceCollection: Collection

describe('ServiceMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    serviceCollection = await MongoHelper.getCollection('services')
    await serviceCollection.deleteMany({})
  })

  const makeSut = (): ServiceMongoRepository => {
    return new ServiceMongoRepository()
  }

  describe('add()', () => {
    test('Should return an Service on success', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      const service = await sut.add(addServiceParams)
      expect(service.id).toBeTruthy()
      expect(service.apiName).toBe(addServiceParams.apiName)
      expect(service.baseUrl).toBe(addServiceParams.baseUrl)
      expect(service.description).toBe(addServiceParams.description)
      expect(service.hostName).toBe(addServiceParams.hostName)
      expect(service.isActive).toBe(addServiceParams.isActive)
      expect(service.resources).toEqual(addServiceParams.resources)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of Services on success', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      await serviceCollection.insertOne(addServiceParams)
      const services = await sut.loadAll()
      expect(services).toBeTruthy()
      expect(services.data[0].id).toBeTruthy()
      expect(services.data[0].apiName).toBe(addServiceParams.apiName)
      expect(services.data[0].baseUrl).toBe(addServiceParams.baseUrl)
      expect(services.data[0].description).toBe(addServiceParams.description)
      expect(services.data[0].hostName).toBe(addServiceParams.hostName)
      expect(services.data[0].isActive).toBe(addServiceParams.isActive)
      expect(services.data[0].resources).toEqual(addServiceParams.resources)
    })

    test('Should return a paginated list of Services on success', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      await serviceCollection.insertOne(addServiceParams)
      const pagination = { pageSize: 1, currentPage: 1 }
      const services = await sut.loadAll(null, pagination)
      expect(services).toBeTruthy()
      expect(services.data[0].id).toBeTruthy()
      expect(services.data[0].apiName).toBe(addServiceParams.apiName)
      expect(services.data[0].baseUrl).toBe(addServiceParams.baseUrl)
      expect(services.data[0].description).toBe(addServiceParams.description)
      expect(services.data[0].hostName).toBe(addServiceParams.hostName)
      expect(services.data[0].isActive).toBe(addServiceParams.isActive)
      expect(services.data[0].resources).toEqual(addServiceParams.resources)
    })

    test('Should return a list of Services with filter on success', async () => {
      const sut = makeSut()
      const addServiceParams1 = mockAddServiceParams()
      const addServiceParams2 = mockAddServiceParams()
      await serviceCollection.insertOne(addServiceParams2)
      await serviceCollection.insertOne(addServiceParams1)
      const filter = { baseUrl: addServiceParams2.baseUrl }
      const services = await sut.loadAll(filter)
      expect(services).toBeTruthy()
      expect(services.data[0].id).toBeTruthy()
      expect(services.data[0].baseUrl).toContain(addServiceParams2.baseUrl)
    })

    test('Should return empty array', async () => {
      const sut = makeSut()
      const services = await sut.loadAll()
      expect(services.data).toEqual([])
    })
  })
})

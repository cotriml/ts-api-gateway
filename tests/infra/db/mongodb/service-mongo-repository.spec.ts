import env from '@/main/config/env'
import { MongoHelper, ServiceMongoRepository } from '@/infra/db'
import { mockAddServiceParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import ObjectId from 'bson-objectid'
import faker from 'faker'

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

  describe('delete()', () => {
    test('Should return true on deletion success', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      const serviceInserted = await serviceCollection.insertOne(addServiceParams)
      const result = await sut.delete(serviceInserted.insertedId)
      expect(result).toBe(true)
    })

    test('Should return false if Service not found', async () => {
      const sut = makeSut()
      const fakeObjectId = new ObjectId()
      const result = await sut.delete(fakeObjectId.id)
      expect(result).toBe(false)
    })
  })

  describe('checkByBaseUrl()', () => {
    test('Should return true if baseUrl is valid', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      await serviceCollection.insertOne(addServiceParams)
      const exists = await sut.checkByBaseUrl(addServiceParams.baseUrl)
      expect(exists).toBe(true)
    })

    test('Should return false if baseUrl is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByBaseUrl(faker.internet.domainName())
      expect(exists).toBe(false)
    })
  })

  describe('loadByBaseUrl()', () => {
    test('Should return an Service on success', async () => {
      const sut = makeSut()
      const addServiceParams = mockAddServiceParams()
      addServiceParams.baseUrl = '/fake-api/v1'
      await serviceCollection.insertOne(addServiceParams)
      const service = await sut.loadByBaseUrl('/fake-api')
      expect(service).toBeTruthy()
      expect(service[0].id).toBeTruthy()
      expect(service[0].apiName).toBe(addServiceParams.apiName)
      expect(service[0].baseUrl).toBe(addServiceParams.baseUrl)
      expect(service[0].description).toBe(addServiceParams.description)
      expect(service[0].hostName).toBe(addServiceParams.hostName)
      expect(service[0].isActive).toBe(addServiceParams.isActive)
      expect(service[0].resources).toEqual(addServiceParams.resources)
    })

    test('Should return null if loadByBaseUrl fails', async () => {
      const sut = makeSut()
      const service = await sut.loadByBaseUrl(faker.internet.domainName())
      expect(service).toEqual([])
    })
  })

  describe('updateService()', () => {
    test('Should update a service on success', async () => {
      const sut = makeSut()
      const res = await serviceCollection.insertOne(mockAddServiceParams())
      const fakeService = res.ops[0]
      const updateFields = {
        id: fakeService._id,
        apiName: fakeService.apiName
      }
      await sut.update(updateFields)
      const service = await serviceCollection.findOne({ _id: fakeService._id })
      expect(service).toBeTruthy()
      expect(service.apiName).toBe(updateFields.apiName)
    })
  })
})

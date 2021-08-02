import { DbLoadServiceByBaseUrl } from '@/data/usecases'
import { ServiceModel } from '@/domain/models'
import { LoadServiceByBaseUrlRepositorySpy } from '@/tests/data/mocks'
import { mockServiceModel, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadServiceByBaseUrl
  loadServiceByBaseUrlRepositorySpy: LoadServiceByBaseUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadServiceByBaseUrlRepositorySpy = new LoadServiceByBaseUrlRepositorySpy()
  const sut = new DbLoadServiceByBaseUrl(loadServiceByBaseUrlRepositorySpy)
  return {
    sut,
    loadServiceByBaseUrlRepositorySpy
  }
}

describe('DbLoadServiceByBaseUrl Usecase', () => {
  test('Should call LoadServiceByBaseUrlRepository with correct values', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    const fakeBaseUrl = '/fake-base-url/v2'
    await sut.loadByBaseUrl(fakeBaseUrl)
    expect(loadServiceByBaseUrlRepositorySpy.baseUrl).toBe('/' + fakeBaseUrl.split('/')[1])
  })

  test('Should return null if LoadServiceByBaseUrlRepository returns null', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    loadServiceByBaseUrlRepositorySpy.result = []
    const service = await sut.loadByBaseUrl(faker.internet.domainName())
    expect(service).toBeNull()
  })

  test('Should throw if LoadServiceByBaseUrlRepository throws', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    jest.spyOn(loadServiceByBaseUrlRepositorySpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const promise = sut.loadByBaseUrl(faker.internet.domainName())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an service on success', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    const serviceModel1 = mockServiceModel()
    serviceModel1.baseUrl = '/fake-base-url/v1'
    const serviceModel2 = mockServiceModel()
    serviceModel2.baseUrl = '/fake-base-url/v2'
    jest.spyOn(loadServiceByBaseUrlRepositorySpy, 'loadByBaseUrl').mockImplementationOnce(async (): Promise<ServiceModel[]> => {
      return [serviceModel1, serviceModel2]
    })
    const service = await sut.loadByBaseUrl(serviceModel1.baseUrl)
    expect(service).toEqual(serviceModel1)
  })

  test('Should return an service on success', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    const serviceModel = mockServiceModel()
    jest.spyOn(loadServiceByBaseUrlRepositorySpy, 'loadByBaseUrl').mockImplementationOnce(async (): Promise<ServiceModel[]> => {
      return [serviceModel]
    })
    const service = await sut.loadByBaseUrl(serviceModel.baseUrl)
    expect(service).toEqual(serviceModel)
  })
})

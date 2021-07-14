import { DbLoadServiceByBaseUrl } from '@/data/usecases'
import { LoadServiceByBaseUrlRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

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
    const fakeBaseUrl = faker.internet.domainName()
    await sut.loadByBaseUrl(fakeBaseUrl)
    expect(loadServiceByBaseUrlRepositorySpy.baseUrl).toBe(fakeBaseUrl)
  })

  test('Should return null if LoadServiceByBaseUrlRepository returns null', async () => {
    const { sut, loadServiceByBaseUrlRepositorySpy } = makeSut()
    loadServiceByBaseUrlRepositorySpy.result = null
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
    const service = await sut.loadByBaseUrl(faker.internet.domainName())
    expect(service).toEqual(loadServiceByBaseUrlRepositorySpy.result)
  })
})

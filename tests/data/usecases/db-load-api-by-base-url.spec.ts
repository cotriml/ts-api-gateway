import { DbLoadApiByBaseUrl } from '@/data/usecases'
import { LoadApiByBaseUrlRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadApiByBaseUrl
  loadApiByBaseUrlRepositorySpy: LoadApiByBaseUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadApiByBaseUrlRepositorySpy = new LoadApiByBaseUrlRepositorySpy()
  const sut = new DbLoadApiByBaseUrl(loadApiByBaseUrlRepositorySpy)
  return {
    sut,
    loadApiByBaseUrlRepositorySpy
  }
}

describe('DbLoadApiByBaseUrl Usecase', () => {
  test('Should call LoadApiByBaseUrlRepository with correct values', async () => {
    const { sut, loadApiByBaseUrlRepositorySpy } = makeSut()
    const fakeBaseUrl = faker.internet.domainName()
    await sut.loadByBaseUrl(fakeBaseUrl)
    expect(loadApiByBaseUrlRepositorySpy.baseUrl).toBe(fakeBaseUrl)
  })

  test('Should return null if LoadUserByTokenRepository returns null', async () => {
    const { sut, loadApiByBaseUrlRepositorySpy } = makeSut()
    loadApiByBaseUrlRepositorySpy.result = null
    const api = await sut.loadByBaseUrl(faker.internet.domainName())
    expect(api).toBeNull()
  })

  test('Should throw if LoadUserByTokenRepository throws', async () => {
    const { sut, loadApiByBaseUrlRepositorySpy } = makeSut()
    jest.spyOn(loadApiByBaseUrlRepositorySpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const promise = sut.loadByBaseUrl(faker.internet.domainName())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an api on success', async () => {
    const { sut, loadApiByBaseUrlRepositorySpy } = makeSut()
    const api = await sut.loadByBaseUrl(faker.internet.domainName())
    expect(api).toEqual(loadApiByBaseUrlRepositorySpy.result)
  })
})

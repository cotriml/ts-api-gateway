import { DbCheckServiceByBaseUrl } from '@/data/usecases'
import { CheckServiceByBaseUrlRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckServiceByBaseUrl
  checkServiceByBaseUrlRepositorySpy: CheckServiceByBaseUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkServiceByBaseUrlRepositorySpy = new CheckServiceByBaseUrlRepositorySpy()
  const sut = new DbCheckServiceByBaseUrl(checkServiceByBaseUrlRepositorySpy)
  return {
    sut,
    checkServiceByBaseUrlRepositorySpy
  }
}

describe('DbCheckServiceByBaseUrl Usecase', () => {
  test('Should call CheckServiceByBaseUrlRepository with correct values', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const fakeBaseUrl = faker.internet.domainName()
    await sut.checkByBaseUrl(fakeBaseUrl)
    expect(checkServiceByBaseUrlRepositorySpy.baseUrl).toBe(fakeBaseUrl)
  })

  test('Should return null if CheckServiceByBaseUrlRepository returns null', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    checkServiceByBaseUrlRepositorySpy.result = null
    const service = await sut.checkByBaseUrl(faker.internet.domainName())
    expect(service).toBeNull()
  })

  test('Should throw if CheckServiceByBaseUrlRepository throws', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    jest.spyOn(checkServiceByBaseUrlRepositorySpy, 'checkByBaseUrl').mockImplementationOnce(throwError)
    const promise = sut.checkByBaseUrl(faker.internet.domainName())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a boolean on success', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const service = await sut.checkByBaseUrl(faker.internet.domainName())
    expect(service).toEqual(checkServiceByBaseUrlRepositorySpy.result)
  })
})

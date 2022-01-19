import { DbAddService } from '@/data/usecases'
import { mockAddServiceParams, throwError } from '@/tests/domain/mocks'
import { AddServiceRepositorySpy, CheckServiceByBaseUrlRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddService
  addServiceRepositorySpy: AddServiceRepositorySpy
  checkServiceByBaseUrlRepositorySpy: CheckServiceByBaseUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const addServiceRepositorySpy = new AddServiceRepositorySpy()
  const checkServiceByBaseUrlRepositorySpy = new CheckServiceByBaseUrlRepositorySpy()
  const sut = new DbAddService(addServiceRepositorySpy, checkServiceByBaseUrlRepositorySpy)
  return {
    sut,
    addServiceRepositorySpy,
    checkServiceByBaseUrlRepositorySpy
  }
}

describe('DbAddService Usecase', () => {
  test('Should call AddServiceRepository with correct values', async () => {
    const { sut, addServiceRepositorySpy } = makeSut()
    const addServiceParams = mockAddServiceParams()
    await sut.add(addServiceParams)
    expect(addServiceRepositorySpy.addServiceParams).toEqual(addServiceParams)
  })

  test('Should throw if AddServiceRepository throws', async () => {
    const { sut, addServiceRepositorySpy } = makeSut()
    jest.spyOn(addServiceRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddServiceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckServiceByBaseUrlRepository with correct values', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const addServiceParams = mockAddServiceParams()
    await sut.add(addServiceParams)
    expect(checkServiceByBaseUrlRepositorySpy.baseUrl).toEqual(addServiceParams.baseUrl)
  })

  test('Should return null if CheckServiceByBaseUrlRepository returns false', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const addServiceParams = mockAddServiceParams()
    checkServiceByBaseUrlRepositorySpy.result = true
    const response = await sut.add(addServiceParams)
    expect(response).toBeNull()
  })

  test('Should throw if CheckServiceByBaseUrlRepository throws', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    jest.spyOn(checkServiceByBaseUrlRepositorySpy, 'checkByBaseUrl').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddServiceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return the added service on success', async () => {
    const { sut, addServiceRepositorySpy } = makeSut()
    const service = await sut.add(mockAddServiceParams())
    expect(service).toBeTruthy()
    expect(service).toEqual(addServiceRepositorySpy.result)
  })
})

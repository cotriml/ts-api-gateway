import { DbUpdateService } from '@/data/usecases'
import { mockUpdateServiceParams, throwError } from '@/tests/domain/mocks'
import { CheckServiceByBaseUrlRepositorySpy, UpdateServiceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateService
  updateServiceRepositorySpy: UpdateServiceRepositorySpy
  checkServiceByBaseUrlRepositorySpy: CheckServiceByBaseUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateServiceRepositorySpy = new UpdateServiceRepositorySpy()
  const checkServiceByBaseUrlRepositorySpy = new CheckServiceByBaseUrlRepositorySpy()
  const sut = new DbUpdateService(updateServiceRepositorySpy, checkServiceByBaseUrlRepositorySpy)
  return {
    sut,
    updateServiceRepositorySpy,
    checkServiceByBaseUrlRepositorySpy
  }
}

describe('DbAddService Usecase', () => {
  test('Should call UpdateServiceRepository with correct values', async () => {
    const { sut, updateServiceRepositorySpy } = makeSut()
    const addServiceParams = mockUpdateServiceParams()
    await sut.update(addServiceParams)
    expect(updateServiceRepositorySpy.updateServiceParams).toEqual(addServiceParams)
  })

  test('Should throw if UpdateServiceRepository throws', async () => {
    const { sut, updateServiceRepositorySpy } = makeSut()
    jest.spyOn(updateServiceRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateServiceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckServiceByBaseUrlRepository with correct values', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const updateServiceParams = mockUpdateServiceParams()
    await sut.update(updateServiceParams)
    expect(checkServiceByBaseUrlRepositorySpy.baseUrl).toEqual(updateServiceParams.baseUrl)
  })

  test('Should return null if CheckServiceByBaseUrlRepository returns false', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    const updateServiceParams = mockUpdateServiceParams()
    checkServiceByBaseUrlRepositorySpy.result = true
    const response = await sut.update(updateServiceParams)
    expect(response).toBeNull()
  })

  test('Should throw if CheckServiceByBaseUrlRepository throws', async () => {
    const { sut, checkServiceByBaseUrlRepositorySpy } = makeSut()
    jest.spyOn(checkServiceByBaseUrlRepositorySpy, 'checkByBaseUrl').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateServiceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return the added service on success', async () => {
    const { sut, updateServiceRepositorySpy } = makeSut()
    const service = await sut.update(mockUpdateServiceParams())
    expect(service).toBeTruthy()
    expect(service).toEqual(updateServiceRepositorySpy.result)
  })
})

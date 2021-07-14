import { DbUpdateService } from '@/data/usecases'
import { mockUpdateServiceParams, throwError } from '@/tests/domain/mocks'
import { UpdateServiceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateService
  updateServiceRepositorySpy: UpdateServiceRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateServiceRepositorySpy = new UpdateServiceRepositorySpy()
  const sut = new DbUpdateService(updateServiceRepositorySpy)
  return {
    sut,
    updateServiceRepositorySpy
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

  test('Should return the added service on success', async () => {
    const { sut, updateServiceRepositorySpy } = makeSut()
    const service = await sut.update(mockUpdateServiceParams())
    expect(service).toBeTruthy()
    expect(service).toEqual(updateServiceRepositorySpy.result)
  })
})

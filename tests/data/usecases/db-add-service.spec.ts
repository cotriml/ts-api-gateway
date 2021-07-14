import { DbAddService } from '@/data/usecases'
import { mockAddServiceParams, throwError } from '@/tests/domain/mocks'
import { AddServiceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddService
  addServiceRepositorySpy: AddServiceRepositorySpy
}

const makeSut = (): SutTypes => {
  const addServiceRepositorySpy = new AddServiceRepositorySpy()
  const sut = new DbAddService(addServiceRepositorySpy)
  return {
    sut,
    addServiceRepositorySpy
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

  test('Should return the added service on success', async () => {
    const { sut, addServiceRepositorySpy } = makeSut()
    const service = await sut.add(mockAddServiceParams())
    expect(service).toBeTruthy()
    expect(service).toEqual(addServiceRepositorySpy.result)
  })
})

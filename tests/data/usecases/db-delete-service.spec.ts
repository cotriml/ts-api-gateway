import { DbDeleteService } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { DeleteServiceRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbDeleteService
  deleteServiceRepositorySpy: DeleteServiceRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteServiceRepositorySpy = new DeleteServiceRepositorySpy()
  const sut = new DbDeleteService(deleteServiceRepositorySpy)
  return {
    sut,
    deleteServiceRepositorySpy
  }
}

describe('DbDeleteService Usecase', () => {
  test('Should call DeleteServiceRepository with correct values', async () => {
    const { sut, deleteServiceRepositorySpy } = makeSut()
    const serviceId = faker.random.uuid()
    await sut.delete(serviceId)
    expect(deleteServiceRepositorySpy.serviceId).toBe(serviceId)
  })

  test('Should throw if DeleteServiceRepository throws', async () => {
    const { sut, deleteServiceRepositorySpy } = makeSut()
    jest.spyOn(deleteServiceRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if DeleteServiceRepository returns false', async () => {
    const { sut, deleteServiceRepositorySpy } = makeSut()
    deleteServiceRepositorySpy.result = false
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(false)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(true)
  })
})

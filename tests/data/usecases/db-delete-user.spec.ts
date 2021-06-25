import { DbDeleteUser } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { DeleteUserRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbDeleteUser
  deleteUserRepositorySpy: DeleteUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteUserRepositorySpy = new DeleteUserRepositorySpy()
  const sut = new DbDeleteUser(deleteUserRepositorySpy)
  return {
    sut,
    deleteUserRepositorySpy
  }
}

describe('DbDeleteUser Usecase', () => {
  test('Should call DeleteUserRepository with correct values', async () => {
    const { sut, deleteUserRepositorySpy } = makeSut()
    const userId = faker.random.uuid()
    await sut.delete(userId)
    expect(deleteUserRepositorySpy.userId).toBe(userId)
  })

  test('Should throw if DeleteUserRepository throws', async () => {
    const { sut, deleteUserRepositorySpy } = makeSut()
    jest.spyOn(deleteUserRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if DeleteUserRepository returns false', async () => {
    const { sut, deleteUserRepositorySpy } = makeSut()
    deleteUserRepositorySpy.result = false
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(false)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isDeleted = await sut.delete(faker.random.uuid())
    expect(isDeleted).toBe(true)
  })
})

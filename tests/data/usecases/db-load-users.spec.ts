import { DbLoadUsers } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { LoadUsersRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadUsers
  loadUsersRepositorySpy: LoadUsersRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUsersRepositorySpy = new LoadUsersRepositorySpy()
  const sut = new DbLoadUsers(loadUsersRepositorySpy)
  return {
    sut,
    loadUsersRepositorySpy
  }
}

describe('DbLoadUsers', () => {
  test('Should call LoadUsersRepository', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    await sut.load()
    expect(loadUsersRepositorySpy.count).toBe(1)
  })

  test('Should return a list of Users on success', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    const users = await sut.load()
    expect(users).toEqual(loadUsersRepositorySpy.result)
  })

  test('Should call LoadUsersRepository with pagination', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    const pagination = {pageSize: 1, currentPage: 1}
    await sut.load(pagination)
    expect(pagination).toEqual(loadUsersRepositorySpy.pagination)
  })

  test('Should throw if LoadUsersRepository throws', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    jest.spyOn(loadUsersRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})

import { DbAddUser } from '@/data/usecases'
import { mockAddUserParams, throwError } from '@/tests/domain/mocks'
import { HasherSpy, AddUserRepositorySpy, CheckUserByEmailRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddUser
  hasherSpy: HasherSpy
  addUserRepositorySpy: AddUserRepositorySpy
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new DbAddUser(hasherSpy, addUserRepositorySpy, checkUserByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addUserRepositorySpy,
    checkUserByEmailRepositorySpy
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(hasherSpy.plaintext).toBe(addUserParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(addUserRepositorySpy.addUserParams).toEqual({
      name: addUserParams.name,
      role: addUserParams.role,
      email: addUserParams.email,
      password: hasherSpy.digest
    })
  })

  test('Should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    jest.spyOn(addUserRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const user = await sut.add(mockAddUserParams())
    expect(user).toBeTruthy()
    expect(user).toBe(addUserRepositorySpy.result)
  })

  test('Should call CheckUserByEmailRepository with correct email', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(checkUserByEmailRepositorySpy.email).toBe(addUserParams.email)
  })

  test('Should return null if CheckUserByEmailRepository return true', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    checkUserByEmailRepositorySpy.result = true
    const user = await sut.add(mockAddUserParams())
    expect(user).toBe(null)
  })

  test('Should throw if CheckUserByEmailRepository throws', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkUserByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })
})

import { DbLoadUserByToken } from '@/data/usecases'
import { DecrypterSpy, LoadUserByTokenRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadUserByToken
  decrypterSpy: DecrypterSpy
  loadUserByTokenRepositorySpy: LoadUserByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadUserByTokenRepositorySpy = new LoadUserByTokenRepositorySpy()
  const sut = new DbLoadUserByToken(decrypterSpy, loadUserByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadUserByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbLoadUserByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.uuid()
    role = faker.random.word()
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const user = await sut.load(token, role)
    expect(user).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const user = await sut.load(token, role)
    expect(user).toBeNull()
  })

  test('Should call LoadUserByTokenRepository with correct values', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadUserByTokenRepositorySpy.token).toBe(token)
    expect(loadUserByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadUserByTokenRepository returns null', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    loadUserByTokenRepositorySpy.result = null
    const user = await sut.load(token, role)
    expect(user).toBeNull()
  })

  test('Should throw if LoadUserByTokenRepository throws', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadUserByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut, loadUserByTokenRepositorySpy } = makeSut()
    const user = await sut.load(token, role)
    expect(user).toEqual(loadUserByTokenRepositorySpy.result)
  })
})

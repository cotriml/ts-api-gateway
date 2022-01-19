import { LoadUsersController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadUsersSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { GeneralError } from '@/presentation/errors'
import faker from 'faker'

type SutTypes = {
  sut: LoadUsersController
  loadUsersSpy: LoadUsersSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadUsersSpy = new LoadUsersSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadUsersController(loadUsersSpy, validationSpy)
  return {
    sut,
    loadUsersSpy,
    validationSpy
  }
}

describe('LoadUsers Controller', () => {
  test('Should call LoadUsers', async () => {
    const { sut, loadUsersSpy } = makeSut()
    await sut.handle()
    expect(loadUsersSpy.count).toBe(1)
  })

  test('Should return 200 on success ', async () => {
    const { sut, loadUsersSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadUsersSpy.result))
  })

  test('Should reuturn 500 if LoadUsers throws', async () => {
    const { sut, loadUsersSpy } = makeSut()
    jest.spyOn(loadUsersSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = { pageSize: 1, currentPage: 1 }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new GeneralError(faker.random.word())
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

import { AddUserController } from '@/presentation/controllers'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { serverError, badRequest, forbidden, created } from '@/presentation/helpers'
import { ValidationSpy, AddUserSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): AddUserController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: faker.random.word(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: AddUserController
  addUserSpy: AddUserSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addUserSpy = new AddUserSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddUserController(addUserSpy, validationSpy)
  return {
    sut,
    addUserSpy,
    validationSpy
  }
}

describe('AddUser Controller', () => {
  test('should call AddUser with correct values', async () => {
    const { sut, addUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addUserSpy.addUserParams).toEqual({
      name: request.name,
      role: request.role,
      email: request.email,
      password: request.password
    })
  })

  test('should return 201 if AddUser returns an user', async () => {
    const { sut, addUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(created(addUserSpy.result))
  })

  test('should return 403 if AddUser returns null', async () => {
    const { sut, addUserSpy } = makeSut()
    addUserSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('should return 500 if AddUser throws', async () => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

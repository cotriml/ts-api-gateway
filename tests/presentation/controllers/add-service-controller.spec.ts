import { AddServiceController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
import { serverError, badRequest, forbidden, created } from '@/presentation/helpers'
import { ValidationSpy, AddServiceSpy } from '@/tests/presentation/mocks'
import { mockAddServiceParams, throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: AddServiceController
  addServiceSpy: AddServiceSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addServiceSpy = new AddServiceSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddServiceController(addServiceSpy, validationSpy)
  return {
    sut,
    addServiceSpy,
    validationSpy
  }
}

describe('AddService Controller', () => {
  test('should call AddService with correct values', async () => {
    const { sut, addServiceSpy } = makeSut()
    const request = mockAddServiceParams()
    await sut.handle(request)
    expect(addServiceSpy.addServiceParams).toEqual({
      baseUrl: request.baseUrl,
      hostName: request.hostName,
      apiName: request.apiName,
      description: request.description,
      resources: request.resources,
      isActive: request.isActive
    })
  })

  test('should return 201 if AddService returns an service', async () => {
    const { sut, addServiceSpy } = makeSut()
    const httpResponse = await sut.handle(mockAddServiceParams())
    expect(httpResponse).toEqual(created(addServiceSpy.result))
  })

  test('should return 403 if AddService returns null', async () => {
    const { sut, addServiceSpy } = makeSut()
    addServiceSpy.result = null
    const httpResponse = await sut.handle(mockAddServiceParams())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError(addServiceSpy.addServiceParams.baseUrl)))
  })

  test('should return 500 if AddService throws', async () => {
    const { sut, addServiceSpy } = makeSut()
    jest.spyOn(addServiceSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAddServiceParams())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAddServiceParams()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockAddServiceParams())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

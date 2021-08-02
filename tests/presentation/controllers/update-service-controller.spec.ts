import { UpdateServiceController } from '@/presentation/controllers'
import { BaseUrlAlreadyExistsError, InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
import { serverError, forbidden, noContent, badRequest } from '@/presentation/helpers'
import { ValidationSpy, UpdateServiceSpy } from '@/tests/presentation/mocks'
import { mockUpdateServiceParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: UpdateServiceController
  updateServiceSpy: UpdateServiceSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const updateServiceSpy = new UpdateServiceSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UpdateServiceController(updateServiceSpy, validationSpy)
  return {
    sut,
    updateServiceSpy,
    validationSpy
  }
}

describe('UpdateService Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UpdateService with correct values', async () => {
    const { sut, updateServiceSpy } = makeSut()
    const request = mockUpdateServiceParams()
    await sut.handle(request)
    expect(updateServiceSpy.updateServiceParams).toEqual({
      serviceId: request.serviceId,
      apiName: request.apiName,
      description: request.description,
      resources: request.resources,
      isActive: request.isActive,
      updatedAt: request.updatedAt
    })
  })

  test('should return 204 if UpdateService returns true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockUpdateServiceParams())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 403 if UpdateService returns null', async () => {
    const { sut, updateServiceSpy } = makeSut()
    updateServiceSpy.result = null
    const httpResponse = await sut.handle(mockUpdateServiceParams())
    expect(httpResponse).toEqual(forbidden(new BaseUrlAlreadyExistsError()))
  })

  test('should return 403 if UpdateService returns false', async () => {
    const { sut, updateServiceSpy } = makeSut()
    updateServiceSpy.result = false
    const httpResponse = await sut.handle(mockUpdateServiceParams())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('serviceId')))
  })

  test('should return 500 if UpdateService throws', async () => {
    const { sut, updateServiceSpy } = makeSut()
    jest.spyOn(updateServiceSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockUpdateServiceParams())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockUpdateServiceParams()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns and error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockUpdateServiceParams())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

import { DeleteServiceController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { DeleteServiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): DeleteServiceController.Request => ({
  serviceId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteServiceController
  deleteServiceSpy: DeleteServiceSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const deleteServiceSpy = new DeleteServiceSpy()
  const validationSpy = new ValidationSpy()
  const sut = new DeleteServiceController(deleteServiceSpy, validationSpy)
  return {
    sut,
    deleteServiceSpy,
    validationSpy
  }
}

describe('DeleteServiceController', () => {
  test('Should call DeleteService with correct values', async () => {
    const { sut, deleteServiceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteServiceSpy.serviceId).toBe(request.serviceId)
  })

  test('Should return 500 if DeleteService throws', async () => {
    const { sut, deleteServiceSpy } = makeSut()
    jest.spyOn(deleteServiceSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 on delete fail', async () => {
    const { sut, deleteServiceSpy } = makeSut()
    deleteServiceSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('serviceId')))
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

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

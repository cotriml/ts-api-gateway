import { DeleteServiceController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { DeleteServiceSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): DeleteServiceController.Request => ({
  serviceId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteServiceController
  deleteServiceSpy: DeleteServiceSpy
}

const makeSut = (): SutTypes => {
  const deleteServiceSpy = new DeleteServiceSpy()
  const sut = new DeleteServiceController(deleteServiceSpy)
  return {
    sut,
    deleteServiceSpy
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

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

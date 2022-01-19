import { LoadServicesController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadServicesSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { GeneralError } from '@/presentation/errors'
import faker from 'faker'

const mockRequest = (): LoadServicesController.Request => ({
  baseUrl: faker.random.word(),
  apiName: faker.random.word()
})

type SutTypes = {
  sut: LoadServicesController
  loadServicesSpy: LoadServicesSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadServicesSpy = new LoadServicesSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadServicesController(loadServicesSpy, validationSpy)
  return {
    sut,
    loadServicesSpy,
    validationSpy
  }
}

describe('LoadServices Controller', () => {
  test('Should call LoadServices', async () => {
    const { sut, loadServicesSpy } = makeSut()
    await sut.handle()
    expect(loadServicesSpy.count).toBe(1)
  })

  test('Should call LoadServices with correct filter', async () => {
    const { sut, loadServicesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadServicesSpy.count).toBe(1)
    expect(loadServicesSpy.filter).toEqual(request)
    expect(loadServicesSpy.filter.isActive).toBeFalsy()
  })

  test('Should return 200 on success', async () => {
    const { sut, loadServicesSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadServicesSpy.result))
  })

  test('Should reuturn 500 if LoadServices throws', async () => {
    const { sut, loadServicesSpy } = makeSut()
    jest.spyOn(loadServicesSpy, 'loadAll').mockImplementationOnce(throwError)
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

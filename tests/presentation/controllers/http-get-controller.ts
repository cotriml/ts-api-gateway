import { HttpGetController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { mockCallApiParams, throwError } from '@/tests/domain/mocks'
import { LoadApiByBaseUrlSpy, CallApiSpy } from '@/tests/presentation/mocks'
import faker from 'faker'
import { InvalidParamError } from '../errors'

const mockRequest = (): HttpGetController.Request => {
  return {
    fullPath: faker.internet.domainWord()
  }
}

type SutTypes = {
  sut: HttpGetController
  loadApiByBaseUrlSpy: LoadApiByBaseUrlSpy
  callApiSpy: CallApiSpy
}

const makeSut = (): SutTypes => {
  const loadApiByBaseUrlSpy = new LoadApiByBaseUrlSpy()
  const callApiSpy = new CallApiSpy()
  const sut = new HttpGetController(loadApiByBaseUrlSpy, callApiSpy)
  return {
    sut,
    loadApiByBaseUrlSpy,
    callApiSpy
  }
}

describe('HttpGetController', () => {
  test('Should call LoadApiByBaseUrlSpy with correct params', async () => {
    const { sut, loadApiByBaseUrlSpy } = makeSut()
    const fakeBaseUrl = mockRequest()
    await sut.handle(mockRequest())
    expect(loadApiByBaseUrlSpy.baseUrl).toBe(fakeBaseUrl)
  })

  test('Should return 400 if LoadApiByBaseUrlSpy returns null', async () => {
    const { sut, loadApiByBaseUrlSpy } = makeSut()
    loadApiByBaseUrlSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toBe(badRequest(new InvalidParamError(loadApiByBaseUrlSpy.baseUrl)))
  })

  test('Should return 500 if LoadApiByBaseUrlSpy throws', async () => {
    const { sut, loadApiByBaseUrlSpy } = makeSut()
    jest.spyOn(loadApiByBaseUrlSpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call CallApi with correct values', async () => {
    const { sut, callApiSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(callApiSpy.params).toEqual(mockCallApiParams())
  })

  test('Should reuturn 500 if CallApi throws', async () => {
    const { sut, callApiSpy } = makeSut()
    jest.spyOn(callApiSpy, 'call').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success ', async () => {
    const { sut, callApiSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(callApiSpy.result.data))
  })
})

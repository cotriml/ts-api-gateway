import { HttpGetController } from '@/presentation/controllers'
import { notFound, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadApiByBaseUrlSpy, CallApiSpy } from '@/tests/presentation/mocks'
import { NotFoundError } from '@/presentation/errors'

import faker from 'faker'

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
    await sut.handle(fakeBaseUrl)
    expect(loadApiByBaseUrlSpy.baseUrl).toBe(fakeBaseUrl.fullPath)
  })

  test('Should return 400 if LoadApiByBaseUrlSpy returns null', async () => {
    const { sut, loadApiByBaseUrlSpy } = makeSut()
    loadApiByBaseUrlSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new NotFoundError()))
  })

  test('Should return 500 if LoadApiByBaseUrlSpy throws', async () => {
    const { sut, loadApiByBaseUrlSpy } = makeSut()
    jest.spyOn(loadApiByBaseUrlSpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call CallApi with correct values', async () => {
    const { sut, callApiSpy, loadApiByBaseUrlSpy } = makeSut()
    const loadApiByBaseUrlResult = loadApiByBaseUrlSpy.result
    const request = mockRequest()
    const httpApiParams = {
      uri: `${loadApiByBaseUrlResult.hostName}${request.fullPath.replace(loadApiByBaseUrlResult.baseUrl, '')}`,
      method: 'GET'
    }
    await sut.handle(request)
    expect(callApiSpy.params).toEqual(httpApiParams)
  })

  test('Should return 500 if CallApi throws', async () => {
    const { sut, callApiSpy, loadApiByBaseUrlSpy } = makeSut()
    jest.spyOn(callApiSpy, 'call').mockImplementationOnce(throwError)
    jest.spyOn(loadApiByBaseUrlSpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success ', async () => {
    const { sut, callApiSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(callApiSpy.result.data))
  })
})

import { HttpDeleteController } from '@/presentation/controllers'
import { notFound, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadServiceByBaseUrlSpy, CallServiceByHttpSpy } from '@/tests/presentation/mocks'
import { NotFoundError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = (): HttpDeleteController.Request => {
  return {
    fullPath: faker.internet.domainWord()
  }
}

type SutTypes = {
  sut: HttpDeleteController
  loadServiceByBaseUrlSpy: LoadServiceByBaseUrlSpy
  callServiceByHttpSpy: CallServiceByHttpSpy
}

const makeSut = (): SutTypes => {
  const loadServiceByBaseUrlSpy = new LoadServiceByBaseUrlSpy()
  const callServiceByHttpSpy = new CallServiceByHttpSpy()
  const sut = new HttpDeleteController(loadServiceByBaseUrlSpy, callServiceByHttpSpy)
  return {
    sut,
    loadServiceByBaseUrlSpy,
    callServiceByHttpSpy
  }
}

describe('HttpDeleteController', () => {
  test('Should call LoadServiceByBaseUrl with correct params', async () => {
    const { sut, loadServiceByBaseUrlSpy } = makeSut()
    const fakeBaseUrl = mockRequest()
    await sut.handle(fakeBaseUrl)
    expect(loadServiceByBaseUrlSpy.baseUrl).toBe(fakeBaseUrl.fullPath)
  })

  test('Should return 400 if LoadServiceByBaseUrl returns null', async () => {
    const { sut, loadServiceByBaseUrlSpy } = makeSut()
    loadServiceByBaseUrlSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new NotFoundError()))
  })

  test('Should return 500 if LoadServiceByBaseUrl throws', async () => {
    const { sut, loadServiceByBaseUrlSpy } = makeSut()
    jest.spyOn(loadServiceByBaseUrlSpy, 'loadByBaseUrl').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call CallServiceByHttpSpy with correct values', async () => {
    const { sut, callServiceByHttpSpy, loadServiceByBaseUrlSpy } = makeSut()
    const loadApiByBaseUrlResult = loadServiceByBaseUrlSpy.result
    const request = mockRequest()
    const httpApiParams = {
      uri: `${loadApiByBaseUrlResult.hostName}${request.fullPath.replace(loadApiByBaseUrlResult.baseUrl, '')}`,
      method: 'DELETE'
    }
    await sut.handle(request)
    expect(callServiceByHttpSpy.params).toEqual(httpApiParams)
  })

  test('Should return 500 if CallServiceByHttpSpy throws', async () => {
    const { sut, callServiceByHttpSpy } = makeSut()
    jest.spyOn(callServiceByHttpSpy, 'callService').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success ', async () => {
    const { sut, callServiceByHttpSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(callServiceByHttpSpy.result.data))
  })
})

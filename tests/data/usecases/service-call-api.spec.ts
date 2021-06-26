import { ServiceCallApi } from '@/data/usecases'
import { CallApiServiceSpy } from '@/tests/data/mocks'
import { mockCallApiParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: ServiceCallApi
  callApiServiceSpy: CallApiServiceSpy
}

const makeSut = (): SutTypes => {
  const callApiServiceSpy = new CallApiServiceSpy()
  const sut = new ServiceCallApi(callApiServiceSpy)
  return {
    sut,
    callApiServiceSpy
  }
}

describe('DbLoadApiByBaseUrl Usecase', () => {
  test('Should call CallApiService with correct values', async () => {
    const { sut, callApiServiceSpy } = makeSut()
    const fakeParams = mockCallApiParams()
    await sut.call(fakeParams)
    expect(callApiServiceSpy.params).toBe(fakeParams)
  })

  test('Should throw if CallApiService throws', async () => {
    const { sut, callApiServiceSpy } = makeSut()
    jest.spyOn(callApiServiceSpy, 'call').mockImplementationOnce(throwError)
    const promise = sut.call(mockCallApiParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return something', async () => {
    const { sut, callApiServiceSpy } = makeSut()
    const api = await sut.call(mockCallApiParams())
    expect(api).toEqual(callApiServiceSpy.result)
  })
})

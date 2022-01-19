import { HttpCallService } from '@/data/usecases'
import { HttpServiceCallerSpy } from '@/tests/data/mocks'
import { mockCallServiceParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: HttpCallService
  httpServiceCallerSpy: HttpServiceCallerSpy
}

const makeSut = (): SutTypes => {
  const httpServiceCallerSpy = new HttpServiceCallerSpy()
  const sut = new HttpCallService(httpServiceCallerSpy)
  return {
    sut,
    httpServiceCallerSpy
  }
}

describe('HttpCallService Usecase', () => {
  test('Should call HttpServiceCaller with correct values', async () => {
    const { sut, httpServiceCallerSpy } = makeSut()
    const fakeParams = mockCallServiceParams()
    await sut.callService(fakeParams)
    expect(httpServiceCallerSpy.params).toBe(fakeParams)
  })

  test('Should throw if HttpServiceCaller throws', async () => {
    const { sut, httpServiceCallerSpy } = makeSut()
    jest.spyOn(httpServiceCallerSpy, 'callService').mockImplementationOnce(throwError)
    const promise = sut.callService(mockCallServiceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return something', async () => {
    const { sut, httpServiceCallerSpy } = makeSut()
    const service = await sut.callService(mockCallServiceParams())
    expect(service).toEqual(httpServiceCallerSpy.result)
  })
})

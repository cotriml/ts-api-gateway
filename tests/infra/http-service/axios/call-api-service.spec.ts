import { CallApiAxiosService } from '@/infra/http-service'
import { mockCallApiParams } from '@/tests/domain/mocks'

describe('CallApiAxiosService', () => {
  const makeSut = (): CallApiAxiosService => {
    return new CallApiAxiosService()
  }

  describe('call()', () => {
    test('Should return a http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams()
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })
  })
})

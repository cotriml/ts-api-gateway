import { CallApiAxiosService } from '@/infra/http-service'
import { mockCallApiParams } from '@/tests/domain/mocks'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(axios)

describe('CallApiAxiosService', () => {
  afterAll(async () => {
    await mockAxios.restore()
  })

  const makeSut = (): CallApiAxiosService => {
    return new CallApiAxiosService()
  }

  describe('call()', () => {
    test('Should return a GET http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('GET')
      mockAxios.onGet(fakeParams.uri).reply(200, {
        result: [{ any: 'any_result' }]
      })
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a POST http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('POST')
      mockAxios.onPost(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a PUT http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('PUT')
      mockAxios.onPut(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a PATCH http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('PATCH')
      mockAxios.onPatch(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a DELETE http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('DELETE')
      mockAxios.onDelete(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return null on fail', async () => {
      const sut = makeSut()
      const fakeParams = mockCallApiParams('ANY')
      const httpResponse = await sut.call(fakeParams)
      expect(httpResponse).toBeNull()
    })
  })
})

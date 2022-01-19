import { CallServiceByAxios } from '@/infra/http-service'
import { mockCallServiceParams } from '@/tests/domain/mocks'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(axios)

describe('CallApiAxiosService', () => {
  afterAll(async () => {
    await mockAxios.restore()
  })

  const makeSut = (): CallServiceByAxios => {
    return new CallServiceByAxios()
  }

  describe('callService()', () => {
    test('Should return a GET http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('GET')
      mockAxios.onGet(fakeParams.uri).reply(200, {
        result: [{ any: 'any_result' }]
      })
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a POST http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('POST')
      mockAxios.onPost(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a PUT http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('PUT')
      mockAxios.onPut(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a PATCH http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('PATCH')
      mockAxios.onPatch(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return a DELETE http response on success', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('DELETE')
      mockAxios.onDelete(fakeParams.uri).reply(200, {
        any: 'any_result'
      })
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeTruthy()
      expect(httpResponse.data).toBeTruthy()
    })

    test('Should return null on fail', async () => {
      const sut = makeSut()
      const fakeParams = mockCallServiceParams('ANY')
      const httpResponse = await sut.callService(fakeParams)
      expect(httpResponse).toBeNull()
    })
  })
})

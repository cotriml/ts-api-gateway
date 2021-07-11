import { ApiSampleRepository } from '@/infra/db'

describe('ApiSampleRepository', () => {
  const makeSut = (): ApiSampleRepository => {
    return new ApiSampleRepository()
  }

  describe('loadByBaseUrl()', () => {
    test('Should return a list a Api on success', async () => {
      const sut = makeSut()
      const sampleBaseUrl = '/fake-api/v1'
      const apiList = await sut.loadByBaseUrl(sampleBaseUrl)
      expect(apiList).toBeTruthy()
      expect(apiList.baseUrl).toBe(sampleBaseUrl)
    })

    test('Should return null if loadByBaseUrl fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByBaseUrl('/fake/v2')
      expect(user).toBeFalsy()
    })
  })
})

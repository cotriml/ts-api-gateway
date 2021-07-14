import { ServiceSampleRepository } from '@/infra/db'

describe('ServiceSampleRepository', () => {
  const makeSut = (): ServiceSampleRepository => {
    return new ServiceSampleRepository()
  }

  describe('loadByBaseUrl()', () => {
    test('Should return a service on success', async () => {
      const sut = makeSut()
      const sampleBaseUrl = '/fake-api/v1'
      const service = await sut.loadByBaseUrl(sampleBaseUrl)
      expect(service).toBeTruthy()
      expect(service.baseUrl).toBe(sampleBaseUrl)
    })

    test('Should return null if loadByBaseUrl does not found a service', async () => {
      const sut = makeSut()
      const sampleBaseUrl = '/fake-api/v2'
      const service = await sut.loadByBaseUrl(sampleBaseUrl)
      expect(service).toBeTruthy()
      expect(service.baseUrl).toBe(sampleBaseUrl)
    })

    test('Should return null if loadByBaseUrl does not found a service', async () => {
      const sut = makeSut()
      const sampleBaseUrl = '/fake-api/v3'
      const service = await sut.loadByBaseUrl(sampleBaseUrl)
      expect(service).toBeNull()
    })

    test('Should return null if loadByBaseUrl does not found a service', async () => {
      const sut = makeSut()
      const service = await sut.loadByBaseUrl('/any')
      expect(service).toBeNull()
    })
  })
})

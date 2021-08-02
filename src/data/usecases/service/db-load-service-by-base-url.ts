import { LoadServiceByBaseUrlRepository } from '@/data/protocols'
import { LoadServiceByBaseUrl } from '@/domain/usecases'

export class DbLoadServiceByBaseUrl implements LoadServiceByBaseUrl {
  constructor (
    private readonly loadServiceByBaseUrlRepository: LoadServiceByBaseUrlRepository
  ) { }

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrl.Result> {
    const splittedBaseUrl = baseUrl.split('/')
    let index: number = 1
    let baseUrlFilter = '/' + splittedBaseUrl[index]
    let response = await this.loadServiceByBaseUrlRepository.loadByBaseUrl(baseUrlFilter)

    while (response.length > 1 && index < splittedBaseUrl.length) {
      index++
      baseUrlFilter = `${baseUrlFilter}/${splittedBaseUrl[index]}`
      response = response.filter(service => service.baseUrl.includes(baseUrlFilter))
    }

    if (response.length === 1) {
      const service = response[0]
      const serviceBaseUrlSplitted = service.baseUrl.split('/')
      const baseUrlOriginal = splittedBaseUrl.slice(0, serviceBaseUrlSplitted.length).join('/')

      if (service.baseUrl !== baseUrlOriginal) {
        return null
      }
      return service
    } else {
      return null
    }
  }
}

import { LoadServiceByBaseUrlRepository } from '@/data/protocols'
import { LoadServiceByBaseUrl } from '@/domain/usecases'

export class DbLoadServiceByBaseUrl implements LoadServiceByBaseUrl {
  constructor (
    private readonly loadServiceByBaseUrlRepository: LoadServiceByBaseUrlRepository
  ) { }

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrl.Result> {
    const service = await this.loadServiceByBaseUrlRepository.loadByBaseUrl(baseUrl)
    return service ? service : null
  }
}

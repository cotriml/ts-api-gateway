import { LoadApiByBaseUrlRepository } from '@/data/protocols'
import { LoadApiByBaseUrl } from '@/domain/usecases'

export class DbLoadApiByBaseUrl implements LoadApiByBaseUrl {
  constructor (
    private readonly loadApiByBaseUrlRepository: LoadApiByBaseUrlRepository
  ) { }

  async loadByBaseUrl (baseUrl: string): Promise<LoadApiByBaseUrl.Result> {
    const api = await this.loadApiByBaseUrlRepository.loadByBaseUrl(baseUrl)
    return api ? api : null
  }
}

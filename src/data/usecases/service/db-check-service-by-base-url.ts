import { CheckServiceByBaseUrlRepository } from '@/data/protocols'
import { CheckServiceByBaseUrl } from '@/domain/usecases'

export class DbCheckServiceByBaseUrl implements CheckServiceByBaseUrl {
  constructor (
    private readonly checkServiceByBaseUrlRepository: CheckServiceByBaseUrlRepository
  ) { }

  async checkByBaseUrl (baseUrl: string): Promise<CheckServiceByBaseUrl.Result> {
    return await this.checkServiceByBaseUrlRepository.checkByBaseUrl(baseUrl)
  }
}

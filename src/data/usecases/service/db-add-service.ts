import { AddServiceRepository, CheckServiceByBaseUrlRepository } from '@/data/protocols'
import { AddService } from '@/domain/usecases'

export class DbAddService implements AddService {
  constructor (
    private readonly addServiceRepository: AddServiceRepository,
    private readonly checkServiceByBaseUrlRepository: CheckServiceByBaseUrlRepository
  ) { }

  async add (params: AddService.Params): Promise<AddService.Result> {
    const exists = await this.checkServiceByBaseUrlRepository.checkByBaseUrl(params.baseUrl)

    if (exists) {
      return null
    }
    return await this.addServiceRepository.add(params)
  }
}

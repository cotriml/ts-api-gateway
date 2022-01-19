import { CheckServiceByBaseUrlRepository, UpdateServiceRepository } from '@/data/protocols'
import { UpdateService } from '@/domain/usecases'

export class DbUpdateService implements UpdateService {
  constructor (
    private readonly updateServiceRepository: UpdateServiceRepository,
    private readonly checkServiceByBaseUrlRepository: CheckServiceByBaseUrlRepository

  ) { }

  async update (params: UpdateService.Params): Promise<UpdateService.Result> {
    const exists = await this.checkServiceByBaseUrlRepository.checkByBaseUrl(params.baseUrl)

    if (exists) {
      return null
    }
    return await this.updateServiceRepository.update(params)
  }
}

import { UpdateServiceRepository } from '@/data/protocols'
import { UpdateService } from '@/domain/usecases'

export class DbUpdateService implements UpdateService {
  constructor (
    private readonly updateServiceRepository: UpdateServiceRepository
  ) { }

  async update (params: UpdateService.Params): Promise<UpdateService.Result> {
    return await this.updateServiceRepository.update(params)
  }
}

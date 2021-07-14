import { DeleteServiceRepository } from '@/data/protocols'
import { DeleteService } from '@/domain/usecases'

export class DbDeleteService implements DeleteService {
  constructor (
    private readonly deleteServiceRepository: DeleteServiceRepository
  ) { }

  async delete (serviceId: string): Promise<DeleteService.Result> {
    const isDeleted = await this.deleteServiceRepository.delete(serviceId)
    return isDeleted
  }
}

import { LoadServicesRepository } from '@/data/protocols'
import { PaginationModel } from '@/domain/models'
import { LoadServices } from '@/domain/usecases'

export class DbLoadServices implements LoadServices {
  constructor (private readonly loadServicesRepository: LoadServicesRepository) { }

  async loadAll (filter?: LoadServices.Filter, pagination?: PaginationModel): Promise<LoadServices.Result> {
    return await this.loadServicesRepository.loadAll(filter, pagination)
  }
}

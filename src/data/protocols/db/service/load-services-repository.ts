import { PaginationModel, ServiceModel } from '@/domain/models'
import { LoadServices } from '@/domain/usecases'

export interface LoadServicesRepository {
  loadAll: (filter?: LoadServicesRepository.Filter, pagination?: PaginationModel) => Promise<LoadServicesRepository.Result>
}

export namespace LoadServicesRepository {
  export type Result = {
    data: ServiceModel[]
  }

  export type Filter = LoadServices.Filter
}

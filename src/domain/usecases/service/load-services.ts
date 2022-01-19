import { PaginationModel, ServiceModel } from '@/domain/models'

export interface LoadServices {
  loadAll: (filter?: LoadServices.Filter, pagination?: PaginationModel) => Promise<LoadServices.Result>
}

export namespace LoadServices {
  export type Result = { data: ServiceModel[] }

  export type Filter = {
    baseUrl?: string
    apiName?: string
    isActive?: boolean
  }
}

import { PaginationModel, ServiceModel } from '@/domain/models'

export interface LoadServices {
  load: (filter?: LoadServices.filter, pagination?: PaginationModel) => Promise<LoadServices.Result>
}

export namespace LoadServices {
  export type Result = { data: ServiceModel[] }

  export type filter = {
    baseUrl: string
    apiName: string
    isActive: boolean
  }
}

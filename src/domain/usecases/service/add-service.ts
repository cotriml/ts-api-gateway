import { ServiceModel } from '@/domain/models'

export interface AddService {
  add: (params: AddService.Params) => Promise<AddService.Result>
}

export namespace AddService {
  export type Params = {
    baseUrl: string
    hostName: string
    apiName: string
    description: string
    resources: Resource[]
    isActive: boolean
  }
  export type Result = ServiceModel

  type Resource = {
    method: string
    endpoint: string
  }
}

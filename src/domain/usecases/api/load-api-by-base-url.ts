import { ApiModel } from '@/domain/models'

export interface LoadApiByBaseUrl {
  loadByBaseUrl: (baseUrl: string) => Promise<LoadApiByBaseUrl.Result>
}

export namespace LoadApiByBaseUrl {
  export type Result = ApiModel
}

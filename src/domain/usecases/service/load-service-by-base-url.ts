import { ServiceModel } from '@/domain/models'

export interface LoadServiceByBaseUrl {
  loadByBaseUrl: (baseUrl: string) => Promise<LoadServiceByBaseUrl.Result>
}

export namespace LoadServiceByBaseUrl {
  export type Result = ServiceModel
}

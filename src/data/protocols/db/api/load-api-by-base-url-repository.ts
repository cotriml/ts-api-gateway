import { LoadApiByBaseUrl } from '@/domain/usecases';

export interface LoadApiByBaseUrlRepository {
  loadByBaseUrl: (baseUrl : string) => Promise<LoadApiByBaseUrlRepository.Result>
}

export namespace LoadApiByBaseUrlRepository {
  export type Result = LoadApiByBaseUrl.Result
}

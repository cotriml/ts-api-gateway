import { LoadServiceByBaseUrl } from '@/domain/usecases';

export interface LoadServiceByBaseUrlRepository {
  loadByBaseUrl: (baseUrl: string) => Promise<LoadServiceByBaseUrlRepository.Result>
}

export namespace LoadServiceByBaseUrlRepository {
  export type Result = LoadServiceByBaseUrl.Result
}

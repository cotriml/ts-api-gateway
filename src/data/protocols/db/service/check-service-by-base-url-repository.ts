import { CheckServiceByBaseUrl } from '@/domain/usecases';

export interface CheckServiceByBaseUrlRepository {
  checkByBaseUrl: (baseUrl: string) => Promise<CheckServiceByBaseUrlRepository.Result>
}

export namespace CheckServiceByBaseUrlRepository {
  export type Result = CheckServiceByBaseUrl.Result
}

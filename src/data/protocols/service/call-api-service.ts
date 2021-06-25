import { CallApi } from '@/domain/usecases';

export interface CallApiService {
  call: (params: CallApiService.Params) => Promise<CallApiService.Result>
}

export namespace CallApiService {
  export type Result = CallApi.Result
  export type Params = CallApi.Params
}

import { CallServiceByHttp } from '@/domain/usecases';

export interface HttpServiceCaller {
  callService: (params: HttpServiceCaller.Params) => Promise<HttpServiceCaller.Result>
}

export namespace HttpServiceCaller {
  export type Result = CallServiceByHttp.Result
  export type Params = CallServiceByHttp.Params
}

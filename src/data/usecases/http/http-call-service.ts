import { HttpServiceCaller } from '@/data/protocols'
import { CallServiceByHttp } from '@/domain/usecases'

export class HttpCallService implements CallServiceByHttp {
  constructor (
    private readonly httpServiceCaller: HttpServiceCaller
  ) { }

  async callService (params: CallServiceByHttp.Params): Promise<CallServiceByHttp.Result> {
    return await this.httpServiceCaller.callService(params)
  }
}

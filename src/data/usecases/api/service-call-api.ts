import { CallApiService } from '@/data/protocols'
import { CallApi } from '@/domain/usecases'

export class ServiceCallApi implements CallApi {
  constructor (
    private readonly callApiService: CallApiService
  ) { }

  async call (params: CallApi.Params): Promise<CallApi.Result> {
    return await this.callApiService.call(params)
  }
}

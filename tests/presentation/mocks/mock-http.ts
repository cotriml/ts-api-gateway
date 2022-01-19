import {
  CallServiceByHttp
} from '@/domain/usecases'

import faker from 'faker'

export class CallServiceByHttpSpy implements CallServiceByHttp {
  result = {
    data: [
      faker.name.firstName(),
      faker.name.firstName()
    ],
    statusCode: 200
  }

  params: CallServiceByHttp.Params

  async callService (params: CallServiceByHttp.Params): Promise<CallServiceByHttp.Result> {
    this.params = params
    return Promise.resolve(this.result)
  }
}

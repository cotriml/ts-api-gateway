import {
  CallApiService
} from '@/data/protocols'

import faker from 'faker'

export class CallApiServiceSpy implements CallApiService {
  result = {
    data:[
      faker.name.firstName(),
      faker.name.firstName()
    ],
    statusCode: 200
  }

  params: CallApiService.Params

  async call (params: CallApiService.Params): Promise<CallApiService.Result> {
    this.params = params
    return this.result
  }
}

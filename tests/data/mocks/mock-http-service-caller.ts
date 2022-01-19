import {
  HttpServiceCaller
} from '@/data/protocols'

import faker from 'faker'

export class HttpServiceCallerSpy implements HttpServiceCaller {
  result = {
    data:[
      faker.name.firstName(),
      faker.name.firstName()
    ],
    statusCode: 200
  }

  params: HttpServiceCaller.Params

  async callService (params: HttpServiceCaller.Params): Promise<HttpServiceCaller.Result> {
    this.params = params
    return this.result
  }
}

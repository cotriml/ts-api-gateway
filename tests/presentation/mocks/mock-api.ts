import {
  LoadApiByBaseUrl,
  CallApi
} from '@/domain/usecases'
import { mockApiModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class LoadApiByBaseUrlSpy implements LoadApiByBaseUrl {
  result = mockApiModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadApiByBaseUrl.Result> {
    this.baseUrl = baseUrl
    return Promise.resolve(this.result)
  }
}

export class CallApiSpy implements CallApi {
  result = {
    data: [
      faker.name.firstName(),
      faker.name.firstName()
    ],
    statusCode: 200
  }

  params: CallApi.Params

  async call (params: CallApi.Params): Promise<CallApi.Result> {
    this.params = params
    return Promise.resolve(this.result)
  }
}

import {
  LoadServiceByBaseUrl
} from '@/domain/usecases'
import { mockServiceModel } from '@/tests/domain/mocks'

export class LoadServiceByBaseUrlSpy implements LoadServiceByBaseUrl {
  result = mockServiceModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrl.Result> {
    this.baseUrl = baseUrl
    return Promise.resolve(this.result)
  }
}

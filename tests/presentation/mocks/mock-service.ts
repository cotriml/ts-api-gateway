import {
  AddService,
  LoadServiceByBaseUrl
} from '@/domain/usecases'
import { mockServiceModel } from '@/tests/domain/mocks'

export class AddServiceSpy implements AddService {
  result = mockServiceModel()

  addServiceParams: AddService.Params
  async add (service: AddService.Params): Promise<AddService.Result> {
    this.addServiceParams = service
    return this.result
  }
}

export class LoadServiceByBaseUrlSpy implements LoadServiceByBaseUrl {
  result = mockServiceModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrl.Result> {
    this.baseUrl = baseUrl
    return Promise.resolve(this.result)
  }
}

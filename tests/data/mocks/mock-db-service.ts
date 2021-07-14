import {
  LoadServiceByBaseUrlRepository,
  AddServiceRepository
} from '@/data/protocols'
import { mockServiceModel } from '@/tests/domain/mocks'

export class AddServiceRepositorySpy implements AddServiceRepository {
  result = mockServiceModel()
  addServiceParams: AddServiceRepository.Params

  async add (data: AddServiceRepository.Params): Promise<AddServiceRepository.Result> {
    this.addServiceParams = data
    return this.result
  }
}

export class LoadServiceByBaseUrlRepositorySpy implements LoadServiceByBaseUrlRepository {
  result = mockServiceModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

import {
  LoadServiceByBaseUrlRepository,
  AddServiceRepository,
  UpdateServiceRepository,
  CheckServiceByBaseUrlRepository
} from '@/data/protocols'
import { mockServiceModel } from '@/tests/domain/mocks'

export class AddServiceRepositorySpy implements AddServiceRepository {
  result = mockServiceModel()
  addServiceParams: AddServiceRepository.Params

  async add (params: AddServiceRepository.Params): Promise<AddServiceRepository.Result> {
    this.addServiceParams = params
    return this.result
  }
}

export class UpdateServiceRepositorySpy implements UpdateServiceRepository {
  result = true
  updateServiceParams: UpdateServiceRepository.Params

  async update (params: UpdateServiceRepository.Params): Promise<UpdateServiceRepository.Result> {
    this.updateServiceParams = params
    return this.result
  }
}

export class CheckServiceByBaseUrlRepositorySpy implements CheckServiceByBaseUrlRepository {
  result = true
  baseUrl: string

  async checkByBaseUrl (baseUrl: string): Promise<CheckServiceByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
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

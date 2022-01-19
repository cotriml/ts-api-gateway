import {
  LoadServiceByBaseUrlRepository,
  AddServiceRepository,
  UpdateServiceRepository,
  CheckServiceByBaseUrlRepository,
  LoadServicesRepository,
  DeleteServiceRepository
} from '@/data/protocols'
import { PaginationModel } from '@/domain/models'
import { mockServiceModel, mockServicesModels } from '@/tests/domain/mocks'

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
  result = false
  baseUrl: string

  async checkByBaseUrl (baseUrl: string): Promise<CheckServiceByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

export class LoadServiceByBaseUrlRepositorySpy implements LoadServiceByBaseUrlRepository {
  result = [mockServiceModel()]
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

export class LoadServicesRepositorySpy implements LoadServicesRepository {
  result = { data: mockServicesModels() }
  count: number = 0
  filter: LoadServicesRepository.Filter
  pagination: PaginationModel

  async loadAll (filter?: LoadServicesRepository.Filter, pagination?: PaginationModel): Promise<LoadServicesRepository.Result> {
    this.count++
    this.filter = filter
    this.pagination = pagination

    return this.result
  }
}

export class DeleteServiceRepositorySpy implements DeleteServiceRepository {
  result = true
  serviceId: string

  async delete (serviceId: string): Promise<DeleteServiceRepository.Result> {
    this.serviceId = serviceId
    return this.result
  }
}

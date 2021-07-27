import {
  AddService,
  DeleteService,
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

export class DeleteServiceSpy implements DeleteService {
  result = true
  serviceId: string
  async delete (serviceId: string): Promise<DeleteService.Result> {
    this.serviceId = serviceId
    return this.result
  }
}

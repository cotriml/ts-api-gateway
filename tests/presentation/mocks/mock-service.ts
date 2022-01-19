import {
  AddService,
  DeleteService,
  LoadServiceByBaseUrl,
  LoadServices,
  UpdateService
} from '@/domain/usecases'
import { mockServiceModel, mockServicesModels } from '@/tests/domain/mocks'

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

export class LoadServicesSpy implements LoadServices {
  result = { data: mockServicesModels() }
  count: number = 0
  filter: LoadServices.Filter

  async loadAll (filter?: LoadServices.Filter): Promise<LoadServices.Result> {
    this.count++
    this.filter = filter
    return this.result
  }
}

export class UpdateServiceSpy implements UpdateService {
  result = true
  updateServiceParams: UpdateService.Params

  async update (params: UpdateService.Params): Promise<UpdateService.Result> {
    this.updateServiceParams = params
    return this.result
  }
}

import {
  LoadServiceByBaseUrlRepository
} from '@/data/protocols'
import { mockServiceModel } from '@/tests/domain/mocks'

export class LoadServiceByBaseUrlRepositorySpy implements LoadServiceByBaseUrlRepository {
  result = mockServiceModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

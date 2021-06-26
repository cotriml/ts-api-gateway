import {
  LoadApiByBaseUrlRepository
} from '@/data/protocols'
import { mockApiModel } from '@/tests/domain/mocks'

export class LoadApiByBaseUrlRepositorySpy implements LoadApiByBaseUrlRepository {
  result = mockApiModel()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadApiByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

import {
  LoadApiByBaseUrlRepository
} from '@/data/protocols'
import { mockApiModels } from '@/tests/domain/mocks'

export class LoadApiByBaseUrlRepositorySpy implements LoadApiByBaseUrlRepository {
  result = mockApiModels()
  baseUrl: string

  async loadByBaseUrl (baseUrl: string): Promise<LoadApiByBaseUrlRepository.Result> {
    this.baseUrl = baseUrl
    return this.result
  }
}

import { AddServiceRepository } from '@/data/protocols'
import { AddService } from '@/domain/usecases'

export class DbAddService implements AddService {
  constructor (
    private readonly addServiceRepository: AddServiceRepository
  ) { }

  async add (params: AddService.Params): Promise<AddService.Result> {
    return await this.addServiceRepository.add(params)
  }
}

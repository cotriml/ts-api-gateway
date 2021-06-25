import { LoadUsersRepository } from '@/data/protocols'
import { PaginationModel } from '@/domain/models'
import { LoadUsers } from '@/domain/usecases'

export class DbLoadUsers implements LoadUsers {
  constructor (private readonly loadUsersRepository: LoadUsersRepository) { }

  async load (pagination?: PaginationModel): Promise<LoadUsers.Result> {
    const users = await this.loadUsersRepository.loadAll(pagination)
    return users
  }
}

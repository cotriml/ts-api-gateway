import { PaginationModel, UserModel } from '@/domain/models'

export interface LoadUsersRepository {
  loadAll: (pagination?: PaginationModel) => Promise<LoadUsersRepository.Result>
}

export namespace LoadUsersRepository {
  export type Result = {
    data: UserModel[]
  }
}

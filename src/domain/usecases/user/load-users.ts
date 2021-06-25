import { PaginationModel, UserModel } from '@/domain/models'

export interface LoadUsers {
  load: (pagination?: PaginationModel) => Promise<LoadUsers.Result>
}

export namespace LoadUsers {
  export type Result = {
    data: UserModel[]
  }
}

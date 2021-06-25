import { UserModel } from '@/domain/models'

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = {
    name: string
    role: string
    email: string
    password: string
  }

  export type Result = Omit<UserModel, 'password'>
}

import {
  AddUser,
  Authentication,
  DeleteUser,
  LoadUserByToken,
  LoadUsers
} from '@/domain/usecases'
import { mockUsersModels } from '@/tests/domain/mocks'
import faker from 'faker'

export class AddUserSpy implements AddUser {
  result = {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    role: faker.random.word(),
    email: faker.internet.email()
  }

  addUserParams: AddUser.Params
  async add (user: AddUser.Params): Promise<AddUser.Result> {
    this.addUserParams = user
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  authenticationParams: Authentication.Params

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return this.result
  }
}

export class LoadUserByTokenSpy implements LoadUserByToken {
  result = { id: faker.random.uuid() }
  accessToken: string
  role: string

  async load (accessToken: string, role: string): Promise<LoadUserByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.result)
  }
}

export class LoadUsersSpy implements LoadUsers {
  result = { data: mockUsersModels() }
  count: number = 0
  async load (): Promise<LoadUsers.Result> {
    this.count++
    return this.result
  }
}

export class DeleteUserSpy implements DeleteUser {
  result = true
  userId: string
  async delete (userId: string): Promise<DeleteUser.Result> {
    this.userId = userId
    return this.result
  }
}

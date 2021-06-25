import {
  AddUserRepository,
  CheckUserByEmailRepository,
  DeleteUserRepository,
  LoadUserByEmailRepository,
  LoadUsersRepository,
  UpdateAccessTokenRepository,
  LoadUserByTokenRepository
} from '@/data/protocols'
import { PaginationModel, UserModel } from '@/domain/models'
import { mockUsersModels } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepository {
  result = {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    role: faker.random.word(),
    email: faker.internet.email()
  }
  addUserParams: AddUserRepository.Params

  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    this.addUserParams = data
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy implements CheckUserByEmailRepository {
  result = false
  email: string

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  result = {
    id: faker.random.uuid(),
    role: faker.random.word(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  email: string

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadUsersRepositorySpy implements LoadUsersRepository {
  result = { data: mockUsersModels() }
  count: number = 0
  pagination: PaginationModel

  async loadAll (pagination?: PaginationModel): Promise<LoadUsersRepository.Result> {
    this.count++
    this.pagination = pagination
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class DeleteUserRepositorySpy implements DeleteUserRepository {
  result = true
  userId: string

  async delete (userId: string): Promise<DeleteUserRepository.Result> {
    this.userId = userId
    return this.result
  }
}

export class LoadUserByTokenRepositorySpy implements LoadUserByTokenRepository {
  result = { id: faker.random.uuid() }
  token: string
  role: string

  async loadByToken (token: string, role: string): Promise<LoadUserByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

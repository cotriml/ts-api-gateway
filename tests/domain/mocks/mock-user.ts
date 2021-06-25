import { AddUser, Authentication } from '@/domain/usecases'
import { UserModel } from '@/domain/models'
import faker from 'faker'

export const mockAddUserParams = (): AddUser.Params => ({
  name: faker.name.firstName(),
  role: faker.random.word(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockUserModel = (): UserModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    role: faker.random.word(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockUsersModels = (): UserModel[] => [
  mockUserModel(),
  mockUserModel()
]

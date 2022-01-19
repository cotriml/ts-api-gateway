import { AddUserRepository, Hasher, CheckUserByEmailRepository } from '@/data/protocols'
import { AddUser } from '@/domain/usecases'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository
  ) { }

  async add (userData: AddUser.Params): Promise<AddUser.Result> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(userData.email)
    if (exists) {
      return null
    }

    const hashedPassword = await this.hasher.hash(userData.password)
    return await this.addUserRepository.add({ ...userData, password: hashedPassword })
  }
}

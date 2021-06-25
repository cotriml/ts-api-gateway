import { DeleteUserRepository } from '@/data/protocols'
import { DeleteUser } from '@/domain/usecases'

export class DbDeleteUser implements DeleteUser {
  constructor (
    private readonly deleteUserRepository: DeleteUserRepository
  ) { }

  async delete (userId: string): Promise<DeleteUser.Result> {
    const isDeleted = await this.deleteUserRepository.delete(userId)
    return isDeleted
  }
}

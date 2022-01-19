import { DeleteUser } from '@/domain/usecases'
import { DbDeleteUser } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db'

export const makeDbDeleteUser = (): DeleteUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DbDeleteUser(userMongoRepository)
}

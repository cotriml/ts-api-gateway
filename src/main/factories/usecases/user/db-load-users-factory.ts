import { LoadUsers } from '@/domain/usecases'
import { DbLoadUsers } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadUsers = (): LoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsers(userMongoRepository)
}

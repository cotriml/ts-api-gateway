import { LoadUserByToken } from '@/domain/usecases'
import { DbLoadUserByToken } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { JwtAdapter } from '@/infra/criptography'
import env from '@/main/config/env'

export const makeDbLoadUserByToken = (): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}

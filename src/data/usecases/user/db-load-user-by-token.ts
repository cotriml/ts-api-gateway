import { Decrypter, LoadUserByTokenRepository } from '@/data/protocols'
import { LoadUserByToken } from '@/domain/usecases'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenByRepository: LoadUserByTokenRepository
  ) { }

  async load (accessToken: string, role: string): Promise<LoadUserByToken.Result> {
    let token: string

    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      const user = await this.loadUserByTokenByRepository.loadByToken(accessToken, role)
      if (user) {
        return user
      }
    }
    return null
  }
}

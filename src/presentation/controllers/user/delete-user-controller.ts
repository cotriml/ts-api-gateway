import { Controller, HttpResponse } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { DeleteUser } from '@/domain/usecases'

export class DeleteUserController implements Controller {
  constructor (
    private readonly deleteUser: DeleteUser
  ) { }

  async handle (request: DeleteUserController.Request): Promise<HttpResponse> {
    try {
      const { userId, tokenUserId } = request
      if (tokenUserId === userId) {
        return badRequest(new InvalidParamError('userId'))
      }
      const result = await this.deleteUser.delete(userId)
      if (!result) {
        return badRequest(new InvalidParamError('userId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteUserController {
  export type Request = {
    userId: string
    tokenUserId: string
  }
}

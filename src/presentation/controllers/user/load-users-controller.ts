import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers,
    private readonly validation: Validation
  ) { }

  async handle (request?: LoadUsersController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { pageSize, currentPage } = request || {}
      const pagination = {
        pageSize: +pageSize,
        currentPage: +currentPage
      }
      const users = await this.loadUsers.load(pagination)
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadUsersController {
  export type Request = {
    pageSize?: number
    currentPage?: number
  }
}

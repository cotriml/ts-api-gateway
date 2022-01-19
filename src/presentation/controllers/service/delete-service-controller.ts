import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { DeleteService } from '@/domain/usecases'

export class DeleteServiceController implements Controller {
  constructor (
    private readonly deleteService: DeleteService,
    private readonly validation: Validation
  ) { }

  async handle (request: DeleteServiceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { serviceId } = request

      const result = await this.deleteService.delete(serviceId)
      if (!result) {
        return badRequest(new InvalidParamError('serviceId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteServiceController {
  export type Request = {
    serviceId: string
  }
}

import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadServices } from '@/domain/usecases'

export class LoadServicesController implements Controller {
  constructor (
    private readonly loadServices: LoadServices,
    private readonly validation: Validation
  ) { }

  async handle (request?: LoadServicesController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { pageSize, currentPage, baseUrl, apiName, isActive } = request || {}
      const pagination = {
        pageSize: +pageSize,
        currentPage: +currentPage
      }
      const filter = { baseUrl, apiName, isActive }
      const services = await this.loadServices.loadAll(filter, pagination)
      return ok(services)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadServicesController {
  export type Request = {
    baseUrl?: string
    apiName?: string
    isActive?: boolean
    pageSize?: number
    currentPage?: number
  }
}

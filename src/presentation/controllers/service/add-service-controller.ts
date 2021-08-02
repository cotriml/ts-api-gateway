import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, created, serverError } from '@/presentation/helpers'
import { AddService } from '@/domain/usecases'
import { BaseUrlAlreadyExistsError } from '@/presentation/errors'
import { ResourceModel } from '@/domain/models'

export class AddServiceController implements Controller {
  constructor (
    private readonly addService: AddService,
    private readonly validation: Validation
  ) { }

  async handle (request: AddServiceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { baseUrl, hostName, apiName, description, resources, isActive } = request
      const createdAt = new Date().toJSON()
      const service = await this.addService.add({
        baseUrl,
        hostName,
        apiName,
        description,
        resources,
        isActive,
        createdAt
      })

      if (!service) {
        return forbidden(new BaseUrlAlreadyExistsError())
      }
      return created(service)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddServiceController {
  export type Request = {
    baseUrl: string
    hostName: string
    apiName: string
    description: string
    resources: ResourceModel[]
    isActive: boolean
  }
}

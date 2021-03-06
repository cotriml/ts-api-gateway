import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError, noContent } from '@/presentation/helpers'
import { UpdateService } from '@/domain/usecases'
import { BaseUrlAlreadyExistsError, InvalidParamError } from '@/presentation/errors'
import { ResourceModel } from '@/domain/models'

export class UpdateServiceController implements Controller {
  constructor (
    private readonly updateService: UpdateService,
    private readonly validation: Validation
  ) { }

  async handle (request: UpdateServiceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { serviceId, baseUrl, apiName, hostName, description, resources, isActive } = request
      const updatedAt = new Date().toJSON()
      const updateItems = {
        serviceId,
        baseUrl,
        apiName,
        hostName,
        description,
        resources,
        isActive,
        updatedAt
      }

      const service = await this.updateService.update(updateItems)

      if (service === null) {
        return forbidden(new BaseUrlAlreadyExistsError())
      } else if (!service) {
        return forbidden(new InvalidParamError('serviceId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateServiceController {
  export type Request = {
    serviceId: string
    baseUrl?: string
    hostName?: string
    apiName?: string
    description?: string
    resources?: ResourceModel[]
    isActive?: boolean
  }
}

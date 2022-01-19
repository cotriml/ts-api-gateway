import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, notFound } from '@/presentation/helpers'
import { CallServiceByHttp, LoadServiceByBaseUrl } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'

export class HttpDeleteController implements Controller {
  constructor (
    private readonly loadServiceByBaseUrl: LoadServiceByBaseUrl,
    private readonly callServiceByHttp: CallServiceByHttp
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const { fullPath, body, headers } = request

      const service = await this.loadServiceByBaseUrl.loadByBaseUrl(fullPath)
      if (!service) {
        return notFound(new NotFoundError())
      }

      const httpServiceParams = {
        uri: `${service.hostName}${fullPath.replace(service.baseUrl,'')}`,
        method: 'DELETE',
        body: body,
        headers: headers
      }

      const serviceHttpResponse = await this.callServiceByHttp.callService(httpServiceParams)

      return ok(serviceHttpResponse.data)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace HttpDeleteController {
  export type Request = {
    body?: object
    header?: object
    fullPath: string
    tokenUserId?: string
  }
}

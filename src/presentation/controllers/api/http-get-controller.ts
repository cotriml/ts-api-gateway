import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, notFound } from '@/presentation/helpers'
import { CallApi, LoadApiByBaseUrl } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'

export class HttpGetController implements Controller {
  constructor (
    private readonly loadApiByBaseUrl: LoadApiByBaseUrl,
    private readonly callApi: CallApi
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const { fullPath, body, headers } = request

      const api = await this.loadApiByBaseUrl.loadByBaseUrl(fullPath)
      if (!api) {
        return notFound(new NotFoundError())
      }

      const httpApiParams = {
        uri: `${api.hostName}${fullPath.replace(api.baseUrl,'')}`,
        method: 'GET',
        body: body,
        headers: headers
      }

      const apiHttpResponse = await this.callApi.call(httpApiParams)

      return ok(apiHttpResponse.data)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace HttpGetController {
  export type Request = {
    body?: object
    header?: object
    fullPath: string
    tokenUserId?: string
  }
}

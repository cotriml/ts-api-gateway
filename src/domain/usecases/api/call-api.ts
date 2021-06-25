export interface CallApi {
  call: (params: CallApi.Params) => Promise<CallApi.Result>
}

export namespace CallApi {
  export type Result = any
  export type Params = {
    hostName: string
    baseUrl: string
    resource: string
    method: string
    queryParams: string
    pathParams: string
    body: object
    headers: object
  }
}

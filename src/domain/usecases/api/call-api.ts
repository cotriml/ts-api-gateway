export interface CallApi {
  call: (params: CallApi.Params) => Promise<CallApi.Result>
}

export namespace CallApi {
  export type Result = any
  export type Params = {
    uri: string
    method: string
    body: object
    headers: object
  }
}

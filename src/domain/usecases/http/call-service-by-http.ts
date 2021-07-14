export interface CallServiceByHttp {
  callService: (params: CallServiceByHttp.Params) => Promise<CallServiceByHttp.Result>
}

export namespace CallServiceByHttp {
  export type Result = any
  export type Params = {
    uri: string
    method: string
    body: object
    headers: object
  }
}

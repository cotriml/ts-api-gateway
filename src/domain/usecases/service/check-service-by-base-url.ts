export interface CheckServiceByBaseUrl {
  checkByBaseUrl: (baseUrl: string) => Promise<CheckServiceByBaseUrl.Result>
}

export namespace CheckServiceByBaseUrl {
  export type Result = boolean
}

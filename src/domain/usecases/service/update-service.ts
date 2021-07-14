export interface UpdateService {
  update: (params: UpdateService.Params) => Promise<UpdateService.Result>
}

export namespace UpdateService {
  export type Params = {
    baseUrl?: string
    hostName?: string
    apiName?: string
    description?: string
    resources?: Resource[]
    isActive?: true
  }

  type Resource = {
    method: string
    endpoint: string
  }

  export type Result = boolean
}

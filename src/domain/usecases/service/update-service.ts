export interface UpdateService {
  update: (params: UpdateService.Params) => Promise<void>
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
}

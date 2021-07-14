export type ServiceModel = {
  id: string
  baseUrl: string
  hostName: string
  apiName: string
  description: string
  resources: ResourceModel[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type ResourceModel = {
  method: string
  endpoint: string
}

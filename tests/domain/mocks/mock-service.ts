import { ServiceModel, ResourceModel } from '@/domain/models'
import { AddService, UpdateService } from '@/domain/usecases'

import faker from 'faker'

export const mockAddServiceParams = (): AddService.Params => ({
  baseUrl: faker.internet.domainName(),
  hostName: faker.internet.url(),
  apiName: faker.random.word(),
  description: faker.lorem.sentence(),
  resources: [
    mockResourceModel(),
    mockResourceModel()
  ],
  isActive: true,
  createdAt: new Date().toJSON()
})

export const mockUpdateServiceParams = (): UpdateService.Params => ({
  serviceId: faker.random.uuid(),
  apiName: faker.random.word(),
  description: faker.lorem.sentence(),
  resources: [
    mockResourceModel()
  ],
  isActive: true,
  updatedAt: new Date().toJSON()
})

export const mockServiceModel = (): ServiceModel => {
  return {
    id: faker.random.uuid(),
    baseUrl: faker.internet.domainName(),
    hostName: faker.internet.url(),
    apiName: faker.random.word(),
    description: faker.lorem.sentence(),
    resources: [
      mockResourceModel(),
      mockResourceModel()
    ],
    isActive: true,
    createdAt: faker.date.recent().toJSON(),
    updatedAt: faker.date.future().toJSON()
  }
}

export const mockResourceModel = (): ResourceModel => {
  return {
    method: faker.internet.protocol(),
    endpoint: faker.internet.domainWord()
  }
}

export const mockServicesModels = (): ServiceModel[] => {
  return [
    mockServiceModel(),
    mockServiceModel()
  ]
}

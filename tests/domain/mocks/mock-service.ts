import { ServiceModel, ResourceModel } from '@/domain/models'
import { AddService } from '@/domain/usecases'

import faker from 'faker'

export const mockAddServiceParams = (): AddService.Params => ({
  baseUrl: faker.internet.domainName(),
  hostName: faker.internet.url(),
  apiName: faker.random.word(),
  description: faker.internet.email(),
  resources: [
    mockResourceModel(),
    mockResourceModel()
  ],
  isActive: true
})

export const mockServiceModel = (): ServiceModel => {
  return {
    id: faker.random.uuid(),
    baseUrl: faker.internet.domainName(),
    hostName: faker.internet.url(),
    apiName: faker.random.word(),
    description: faker.internet.email(),
    resources: [
      mockResourceModel(),
      mockResourceModel()
    ],
    isActive: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.future()
  }
}

export const mockResourceModel = (): ResourceModel => {
  return {
    method: faker.internet.protocol(),
    endpoint: faker.internet.domainWord()
  }
}

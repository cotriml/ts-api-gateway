import { ApiModel, ResourceModel } from '@/domain/models'
import { CallApi } from '@/domain/usecases'

import faker from 'faker'

export const mockApiModel = (): ApiModel => {
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

export const mockCallApiParams = (): CallApi.Params => ({
  hostName: faker.internet.url(),
  baseUrl: faker.internet.domainName(),
  resource: faker.internet.domainWord(),
  method: faker.random.word(),
  queryParams: '',
  pathParams: '',
  body: {},
  headers: {}
})

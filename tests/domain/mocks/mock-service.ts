import { ServiceModel, ResourceModel } from '@/domain/models'
import { CallServiceByHttp } from '@/domain/usecases'

import faker from 'faker'

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

export const mockCallServiceParams = (method: string = 'GET'): CallServiceByHttp.Params => ({
  uri: 'http://any-url.com',
  method: method,
  body: {},
  headers: {}
})

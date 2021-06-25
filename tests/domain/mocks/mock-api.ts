import { ApiModel, ResourceModel } from '@/domain/models'
import faker from 'faker'

export const mockApiModel = (): ApiModel => {
  return {
    id: faker.random.uuid(),
    baseUrl: faker.internet.domainName(),
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

import {
  LoadServiceByBaseUrlRepository
} from '@/data/protocols/db'

export class ServiceSampleRepository implements LoadServiceByBaseUrlRepository {
  async loadByBaseUrl (baseUrl: string): Promise<LoadServiceByBaseUrlRepository.Result> {
    const splittedBaseUrl = baseUrl.split('/')
    let index: number = 1
    let baseUrlFilter = splittedBaseUrl[index]
    let response = sampleApi().filter(service => service.baseUrl.includes(baseUrlFilter))

    while (response.length > 1 && index < splittedBaseUrl.length) {
      index++
      baseUrlFilter = `${baseUrlFilter}/${splittedBaseUrl[index]}`
      response = response.filter(service => service.baseUrl.includes(baseUrlFilter))
    }

    if (response.length === 1) {
      const service = response[0]
      const serviceBaseUrlSplitted = service.baseUrl.split('/')
      const baseUrlOriginal = splittedBaseUrl.slice(0, serviceBaseUrlSplitted.length).join('/')

      if (service.baseUrl !== baseUrlOriginal) {
        return null
      }
      return service
    } else {
      return null
    }
  }
}

export const sampleApi = (): LoadServiceByBaseUrlRepository.Result[] => {
  return [{
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3da',
    baseUrl: '/fake-api/v1',
    hostName: 'https://jsonplaceholder.typicode.com',
    apiName: '{JSON} Placeholder',
    description: 'Free fake API for testing and prototyping.',
    resources: [
      { method: 'GET', endpoint: '/posts' },
      { method: 'GET', endpoint: '/posts/{postId}' },
      { method: 'POST', endpoint: '/posts' },
      { method: 'PUT', endpoint: '/posts/{postId}' },
      { method: 'PATCH', endpoint: '/posts/{postId}' },
      { method: 'DELETE', endpoint: '/posts/{postId}' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3db',
    baseUrl: '/fake-api/v2',
    hostName: 'https://jsonplaceholder.typicode.com',
    apiName: '{JSON} Placeholder',
    description: 'Free fake API for testing and prototyping.',
    resources: [
      { method: 'GET', endpoint: '/posts' },
      { method: 'GET', endpoint: '/posts/{postId}' },
      { method: 'GET', endpoint: '/posts/{postId}/comments' },
      { method: 'GET', endpoint: '/comments?postId={postId}' },
      { method: 'POST', endpoint: '/posts' },
      { method: 'PUT', endpoint: '/posts/{postId}' },
      { method: 'PATCH', endpoint: '/posts/{postId}' },
      { method: 'DELETE', endpoint: '/posts/{postId}' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3db',
    baseUrl: '/any-api',
    hostName: 'https://any-api.com',
    apiName: 'Any API',
    description: 'Any API',
    resources: [
      { method: 'GET', endpoint: '/any' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]
}

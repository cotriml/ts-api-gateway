import {
  LoadApiByBaseUrlRepository
} from '@/data/protocols/db'

export class ApiSampleRepository implements LoadApiByBaseUrlRepository {
  async loadByBaseUrl (baseUrl: string): Promise<LoadApiByBaseUrlRepository.Result> {
    const splittedBaseUrl = baseUrl.split('/')
    let index: number = 1
    let baseUrlFilter = splittedBaseUrl[index]
    let response = sampleApi().filter(api => api.baseUrl.includes(baseUrlFilter))

    while (response.length > 1 && index < splittedBaseUrl.length) {
      index++
      baseUrlFilter = `${baseUrlFilter}/${splittedBaseUrl[index]}`
      response = response.filter(api => api.baseUrl.includes(baseUrlFilter))
    }

    if (response.length === 1) {
      const api = response[0]
      const apiBaseUrlSplitted = api.baseUrl.split('/')
      const baseUrlOriginal = splittedBaseUrl.slice(0, apiBaseUrlSplitted.length).join('/')

      if (api.baseUrl !== baseUrlOriginal) {
        return null
      }
      return api
    } else {
      return null
    }
  }
}

export const sampleApi = (): LoadApiByBaseUrlRepository.Result[] => {
  return [{
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3da',
    baseUrl: '/fake-api/v1',
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
  }]
}

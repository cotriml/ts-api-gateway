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
      return response[0]
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
  },
  {
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3dc',
    baseUrl: '/fake/v2',
    hostName: 'https://google.com',
    apiName: 'Fake API 2',
    description: 'A fake API 2',
    resources: [
      { method: 'GET', endpoint: '/customers' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '115e3c74-5605-4e65-b56e-2b7572c8b3db',
    baseUrl: '/pokemon-api/v2',
    hostName: 'https://pokeapi.co/api/v2',
    apiName: 'Pokemon API',
    description: 'A Pokemon API',
    resources: [
      { method: 'GET', endpoint: '/pokemon/{pokemonName}' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]
}

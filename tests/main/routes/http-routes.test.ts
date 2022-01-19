import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'

import { Collection } from 'mongodb'
import request from 'supertest'

let serviceCollection: Collection

const makeService = async (): Promise<void> => {
  await serviceCollection.insertOne({
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
  })
}

describe('Http Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    serviceCollection = await MongoHelper.getCollection('services')
    await serviceCollection.deleteMany({})
  })

  describe('GET /posts', () => {
    test('Should return 200 on GET any API', async () => {
      await makeService()
      await request(app)
        .get('/fake-api/v1/posts')
        .expect(200)
    })
  })

  describe('POST /posts', () => {
    test('Should return 200 on POST any API', async () => {
      await makeService()
      await request(app)
        .post('/fake-api/v1/posts')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('PUT /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await makeService()
      await request(app)
        .put('/fake-api/v1/posts/1')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('PATCH /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await makeService()
      await request(app)
        .patch('/fake-api/v1/posts/1')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('DELETE /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await makeService()
      await request(app)
        .delete('/fake-api/v1/posts/1')
        .expect(200)
    })
  })
})

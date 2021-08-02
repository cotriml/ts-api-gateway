import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

let userCollection: Collection
let serviceCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await userCollection.insertOne({
    name: 'Lucas Cotrim',
    role: 'admin',
    email: 'lucascotrim@hotmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await userCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

const makeService = {
  baseUrl: '/any-api/v1',
  hostName: 'https://any-api.com',
  apiName: 'Any API',
  description: 'Any Fake API',
  isActive: true
}

describe('Services Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    serviceCollection = await MongoHelper.getCollection('services')
    await userCollection.deleteMany({})
    await serviceCollection.deleteMany({})
  })

  describe('POST /services', () => {
    test('Should return 201 on AddService', async () => {
      await makeAccessToken()
      await request(app)
        .post('/services')
        .send(makeService)
        .expect(201)
    })
  })

  describe('GET /services', () => {
    test('Should return 200 on LoadServices success', async () => {
      await makeAccessToken()
      await request(app)
        .get('/services')
        .expect(200)
    })
  })

  describe('DELETE /services/:serviceId', () => {
    test('Should return 204 on DeleteUser success', async () => {
      await makeAccessToken()
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .delete(`/services/${service.ops[0]._id}`)
        .expect(204)
    })
  })

  describe('PATCH /services/:serviceId', () => {
    test('Should return 204 on UpdateService success', async () => {
      await makeAccessToken()
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .patch(`/services/${service.ops[0]._id}`)
        .send({
          apiName: 'Any API V2'
        })
        .expect(204)
    })
  })
})

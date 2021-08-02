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
    test('Should return 201 on AddService with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/services')
        .set('x-access-token', accessToken)
        .send(makeService)
        .expect(201)
    })

    test('Should return 403 on AddService with no accessToken', async () => {
      await request(app)
        .post('/services')
        .send(makeService)
        .expect(403)
    })
  })

  describe('GET /services', () => {
    test('Should return 200 on LoadServices success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/services')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on AddService with no accessToken', async () => {
      await request(app)
        .get('/services')
        .expect(403)
    })
  })

  describe('DELETE /services/:serviceId', () => {
    test('Should return 204 on DeleteUser success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .delete(`/services/${service.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 on AddService with no accessToken', async () => {
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .delete(`/services/${service.ops[0]._id}`)
        .expect(403)
    })
  })

  describe('PATCH /services/:serviceId', () => {
    test('Should return 204 on UpdateService success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .patch(`/services/${service.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .send({
          apiName: 'Any API V2'
        })
        .expect(204)
    })

    test('Should return 403 on AddService with no accessToken', async () => {
      const service = await serviceCollection.insertOne(makeService)
      await request(app)
        .patch(`/services/${service.ops[0]._id}`)
        .send({
          apiName: 'Any API V2'
        })
        .expect(403)
    })
  })
})

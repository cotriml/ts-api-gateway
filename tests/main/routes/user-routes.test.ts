import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import request from 'supertest'
import { hash } from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'
import ObjectID from 'bson-objectid'

let userCollection: Collection

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

describe('Users Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /users', () => {
    test('Should return 201 on addUser with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          name: 'Lucas',
          role: 'admin',
          email: 'lucascotrim3@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    })

    test('Should return 403 on addUser with no accessToken', async () => {
      await request(app)
        .post('/api/users')
        .send({
          name: 'Lucas',
          role: 'admin',
          email: 'lucascotrim3@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })

  describe('POST /users/signin', () => {
    test('Should return 200 on Signin', async () => {
      const password = await hash('123', 12)
      await userCollection.insertOne({
        name: 'Lucas Cotrim',
        role: 'admin',
        email: 'lucascotrim3@hotmail.com',
        password: password
      })

      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'lucascotrim3@hotmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on Signin', async () => {
      await request(app)
        .post('/api/users/signin')
        .send({
          email: 'lucascotrim3@hotmail.com',
          password: '123'
        })
        .expect(401)
    })
  })

  describe('GET /users', () => {
    test('Should return 200 on LoadUsers success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/users')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on LoadUsers success with no accessToken', async () => {
      await request(app)
        .get('/api/users')
        .expect(403)
    })
  })

  describe('DELETE /users/:userId', () => {
    test('Should return 204 on DeleteUser success with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const user = await userCollection.insertOne({
        name: 'Lucas Cotrim',
        role: 'admin',
        email: 'lucascotrim3@hotmail.com',
        password: '123'
      })
      await request(app)
        .delete(`/api/users/${user.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 on DeleteUser success with no accessToken', async () => {
      const user = await userCollection.insertOne({
        name: 'Lucas Cotrim',
        role: 'admin',
        email: 'lucascotrim3@hotmail.com',
        password: '123'
      })
      await request(app)
        .delete(`/api/users/${user.ops[0]._id}`)
        .expect(403)
    })

    test('Should return 400 on DeleteUser failure', async () => {
      const accessToken = await makeAccessToken()
      const objectId = new ObjectID()
      await request(app)
        .delete(`/api/users/${objectId.toHexString()}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 400 on trying to delete yourself', async () => {
      const accessToken = await makeAccessToken()
      const { id } = decode(accessToken)

      await request(app)
        .delete(`/api/users/${id}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })
})

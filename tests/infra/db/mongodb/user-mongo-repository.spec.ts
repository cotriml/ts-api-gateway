import env from '@/main/config/env'
import { MongoHelper, UserMongoRepository } from '@/infra/db'
import { mockAddUserParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import faker from 'faker'
import ObjectId from 'bson-objectid'

let userCollection: Collection

describe('UserMongoRepository', () => {
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

  const makeSut = (): UserMongoRepository => {
    return new UserMongoRepository()
  }

  describe('add()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const user = await sut.add(addUserParams)
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.role).toBe(addUserParams.role)
      expect(user.email).toBe(addUserParams.email)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an User on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByEmail(addUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.password).toBe(addUserParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const exists = await sut.checkByEmail(addUserParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of Users on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const users = await sut.loadAll()
      expect(users.data).toBeTruthy()
      expect(users.data[0].id).toBeTruthy()
      expect(users.data[0].name).toBe(addUserParams.name)
      expect(users.data[0].role).toBe(addUserParams.role)
      expect(users.data[0].email).toBe(addUserParams.email)
      expect(users.data[0].password).toBeFalsy()
    })

    test('Should return a paginated list of Users on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const pagination = { pageSize: 1, currentPage: 1 }
      const users = await sut.loadAll(pagination)
      expect(users).toBeTruthy()
      expect(users.data[0].id).toBeTruthy()
      expect(users.data[0].name).toBe(addUserParams.name)
      expect(users.data[0].role).toBe(addUserParams.role)
      expect(users.data[0].email).toBe(addUserParams.email)
      expect(users.data[0].password).toBeFalsy()
    })

    test('Should return empty array', async () => {
      const sut = makeSut()
      const users = await sut.loadAll()
      expect(users.data).toEqual([])
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the user accessToken on success', async () => {
      const sut = makeSut()
      const res = await userCollection.insertOne(mockAddUserParams())
      const fakeUser = res.ops[0]
      expect(fakeUser.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeUser._id, accessToken)
      const user = await userCollection.findOne({ _id: fakeUser._id })
      expect(user).toBeTruthy()
      expect(user.accessToken).toBe(accessToken)
    })
  })

  describe('delete()', () => {
    test('Should return true on deletion success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const userInserted = await userCollection.insertOne(addUserParams)
      const result = await sut.delete(userInserted.insertedId)
      expect(result).toBe(true)
    })

    test('Should return false if User not found', async () => {
      const sut = makeSut()
      const fakeObjectId = new ObjectId()
      const result = await sut.delete(fakeObjectId.id)
      expect(result).toBe(false)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let role = faker.random.word()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      role = faker.random.word()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('Should return an user on loadByToken', async () => {
      const sut = makeSut()
      await userCollection.insertOne({
        name,
        role,
        email,
        password,
        accessToken
      })
      const user = await sut.loadByToken(accessToken, role)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const invalidRole = faker.random.word()
      await userCollection.insertOne({
        name,
        role,
        email,
        password,
        accessToken
      })
      const user = await sut.loadByToken(accessToken, invalidRole)
      expect(user).toBeFalsy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByToken(accessToken, role)
      expect(user).toBeFalsy()
    })
  })
})

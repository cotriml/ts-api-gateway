import { DeleteUserController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { DeleteUserSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

const mockRequest = (): DeleteUserController.Request => ({
  userId: faker.random.uuid(),
  tokenUserId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteUserController
  deleteUserSpy: DeleteUserSpy
}

const makeSut = (): SutTypes => {
  const deleteUserSpy = new DeleteUserSpy()
  const sut = new DeleteUserController(deleteUserSpy)
  return {
    sut,
    deleteUserSpy
  }
}

describe('DeleteUserController', () => {
  test('Should call DeleteUser with correct values', async () => {
    const { sut, deleteUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteUserSpy.userId).toBe(request.userId)
  })

  test('Should return 500 if DeleteUser throws', async () => {
    const { sut, deleteUserSpy } = makeSut()
    jest.spyOn(deleteUserSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 on delete fail', async () => {
    const { sut, deleteUserSpy } = makeSut()
    deleteUserSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })

  test('Should return 400 if userId is equal tokenUserId', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.userId = request.tokenUserId
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

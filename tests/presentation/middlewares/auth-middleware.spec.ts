import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadUserByTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadUserByTokenSpy: LoadUserByTokenSpy
}

const makeSut = (role: string): SutTypes => {
  const loadUserByTokenSpy = new LoadUserByTokenSpy()
  const sut = new AuthMiddleware(loadUserByTokenSpy, role)
  return {
    sut,
    loadUserByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut('any_role')
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadUserByTokenSpy with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadUserByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(loadUserByTokenSpy.accessToken).toBe(request.accessToken)
    expect(loadUserByTokenSpy.role).toBe(role)
  })

  test('Should return 403 if LoadUserByTokenSpy returns null', async () => {
    const { sut, loadUserByTokenSpy } = makeSut('any_role')
    loadUserByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadUserByTokenSpy returns an user', async () => {
    const { sut, loadUserByTokenSpy } = makeSut('any_role')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      tokenUserId: loadUserByTokenSpy.result.id
    }))
  })

  test('Should return 500 if LoadUserByTokenSpy throws', async () => {
    const { sut, loadUserByTokenSpy } = makeSut('any_role')
    jest.spyOn(loadUserByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

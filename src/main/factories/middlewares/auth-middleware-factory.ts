import { makeDbLoadUserByToken, makeLogControllerDecorator } from '@/main/factories'
import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export const makeAuthMiddleware = (role: string): Middleware => {
  const controller = new AuthMiddleware(makeDbLoadUserByToken(), role)
  return makeLogControllerDecorator(controller)
}

import { makeLogControllerDecorator, makeDbLoadUsers } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadUsersController } from '@/presentation/controllers'
import { makeLoadUsersValidation } from './load-users-validation-factory'

export const makeLoadUsersController = (): Controller => {
  const controller = new LoadUsersController(makeDbLoadUsers(), makeLoadUsersValidation())
  return makeLogControllerDecorator(controller)
}

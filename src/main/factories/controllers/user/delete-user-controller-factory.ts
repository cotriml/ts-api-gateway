import { makeDbDeleteUser, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { DeleteUserController } from '@/presentation/controllers'

export const makeDeleteUserController = (): Controller => {
  const controller = new DeleteUserController(makeDbDeleteUser())
  return makeLogControllerDecorator(controller)
}

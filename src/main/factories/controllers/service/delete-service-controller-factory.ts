import { makeDbDeleteService, makeDeleteServiceValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { DeleteServiceController } from '@/presentation/controllers'

export const makeDeleteServiceController = (): Controller => {
  const controller = new DeleteServiceController(makeDbDeleteService(), makeDeleteServiceValidation())
  return makeLogControllerDecorator(controller)
}

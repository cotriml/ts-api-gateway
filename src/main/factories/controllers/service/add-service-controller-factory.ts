import { makeDbAddService, makeAddServiceValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddServiceController } from '@/presentation/controllers'

export const makeAddServiceController = (): Controller => {
  const controller = new AddServiceController(makeDbAddService(), makeAddServiceValidation())
  return makeLogControllerDecorator(controller)
}

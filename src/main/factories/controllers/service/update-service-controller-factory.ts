import { makeDbUpdateService, makeUpdateServiceValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { UpdateServiceController } from '@/presentation/controllers'

export const makeUpdateServiceController = (): Controller => {
  const controller = new UpdateServiceController(makeDbUpdateService(), makeUpdateServiceValidation())
  return makeLogControllerDecorator(controller)
}

import { makeDbLoadServices, makeLoadServicesValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadServicesController } from '@/presentation/controllers'

export const makeLoadServicesController = (): Controller => {
  const controller = new LoadServicesController(makeDbLoadServices(), makeLoadServicesValidation())
  return makeLogControllerDecorator(controller)
}

import { makeDbLoadApiByBaseUrl, makeServiceCallApi, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpGetController } from '@/presentation/controllers'

export const makeHttpGetController = (): Controller => {
  const controller = new HttpGetController(makeDbLoadApiByBaseUrl(), makeServiceCallApi())
  return makeLogControllerDecorator(controller)
}

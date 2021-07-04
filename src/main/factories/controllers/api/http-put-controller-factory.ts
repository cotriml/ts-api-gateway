import { makeDbLoadApiByBaseUrl, makeServiceCallApi, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpPutController } from '@/presentation/controllers'

export const makeHttpPutController = (): Controller => {
  const controller = new HttpPutController(makeDbLoadApiByBaseUrl(), makeServiceCallApi())
  return makeLogControllerDecorator(controller)
}

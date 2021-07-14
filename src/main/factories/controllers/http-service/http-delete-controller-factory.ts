import { makeDbLoadServiceByBaseUrl, makeCallServiceByHttp, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpDeleteController } from '@/presentation/controllers'

export const makeHttpDeleteController = (): Controller => {
  const controller = new HttpDeleteController(makeDbLoadServiceByBaseUrl(), makeCallServiceByHttp())
  return makeLogControllerDecorator(controller)
}

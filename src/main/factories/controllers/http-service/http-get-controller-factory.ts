import { makeDbLoadServiceByBaseUrl, makeCallServiceByHttp, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpGetController } from '@/presentation/controllers'

export const makeHttpGetController = (): Controller => {
  const controller = new HttpGetController(makeDbLoadServiceByBaseUrl(), makeCallServiceByHttp())
  return makeLogControllerDecorator(controller)
}

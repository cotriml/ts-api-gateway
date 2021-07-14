import { makeDbLoadServiceByBaseUrl, makeCallServiceByHttp, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpPutController } from '@/presentation/controllers'

export const makeHttpPutController = (): Controller => {
  const controller = new HttpPutController(makeDbLoadServiceByBaseUrl(), makeCallServiceByHttp())
  return makeLogControllerDecorator(controller)
}

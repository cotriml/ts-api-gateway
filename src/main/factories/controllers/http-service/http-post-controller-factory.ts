import { makeDbLoadServiceByBaseUrl, makeCallServiceByHttp, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpPostController } from '@/presentation/controllers'

export const makeHttpPostController = (): Controller => {
  const controller = new HttpPostController(makeDbLoadServiceByBaseUrl(), makeCallServiceByHttp())
  return makeLogControllerDecorator(controller)
}

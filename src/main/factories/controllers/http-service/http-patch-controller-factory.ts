import { makeDbLoadServiceByBaseUrl, makeCallServiceByHttp, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpPatchController } from '@/presentation/controllers'

export const makeHttpPatchController = (): Controller => {
  const controller = new HttpPatchController(makeDbLoadServiceByBaseUrl(), makeCallServiceByHttp())
  return makeLogControllerDecorator(controller)
}

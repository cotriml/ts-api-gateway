import { makeDbLoadApiByBaseUrl, makeServiceCallApi, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { HttpPatchController } from '@/presentation/controllers'

export const makeHttpPatchController = (): Controller => {
  const controller = new HttpPatchController(makeDbLoadApiByBaseUrl(), makeServiceCallApi())
  return makeLogControllerDecorator(controller)
}

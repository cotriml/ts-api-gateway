import { CallServiceByHttp } from '@/domain/usecases'
import { HttpCallService } from '@/data/usecases'
import { CallServiceByAxios } from '@/infra/http-service'

export const makeCallServiceByHttp = (): CallServiceByHttp => {
  const callServiceByAxios = new CallServiceByAxios()
  return new HttpCallService(callServiceByAxios)
}

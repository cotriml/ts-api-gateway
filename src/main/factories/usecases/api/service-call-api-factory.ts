import { CallApi } from '@/domain/usecases'
import { ServiceCallApi } from '@/data/usecases'
import { CallApiAxiosService } from '@/infra/http-service'

export const makeServiceCallApi = (): CallApi => {
  const callApiAxiosService = new CallApiAxiosService()
  return new ServiceCallApi(callApiAxiosService)
}

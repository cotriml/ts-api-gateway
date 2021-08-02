import { CheckServiceByBaseUrl } from '@/domain/usecases'
import { DbCheckServiceByBaseUrl } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbCheckServiceByBaseUrl = (): CheckServiceByBaseUrl => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbCheckServiceByBaseUrl(serviceMongoRepository)
}

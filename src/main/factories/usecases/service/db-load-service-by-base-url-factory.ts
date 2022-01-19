import { LoadServiceByBaseUrl } from '@/domain/usecases'
import { DbLoadServiceByBaseUrl } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbLoadServiceByBaseUrl = (): LoadServiceByBaseUrl => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbLoadServiceByBaseUrl(serviceMongoRepository)
}

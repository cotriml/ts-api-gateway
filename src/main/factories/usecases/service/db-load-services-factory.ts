import { LoadServices } from '@/domain/usecases'
import { DbLoadServices } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbLoadServices = (): LoadServices => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbLoadServices(serviceMongoRepository)
}

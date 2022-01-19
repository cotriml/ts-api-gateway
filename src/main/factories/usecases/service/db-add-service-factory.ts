import { AddService } from '@/domain/usecases'
import { DbAddService } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbAddService = (): AddService => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbAddService(serviceMongoRepository, serviceMongoRepository)
}

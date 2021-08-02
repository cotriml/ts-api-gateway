import { UpdateService } from '@/domain/usecases'
import { DbUpdateService } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbUpdateService = (): UpdateService => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbUpdateService(serviceMongoRepository, serviceMongoRepository)
}

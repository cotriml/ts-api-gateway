import { DeleteService } from '@/domain/usecases'
import { DbDeleteService } from '@/data/usecases'
import { ServiceMongoRepository } from '@/infra/db'

export const makeDbDeleteService = (): DeleteService => {
  const serviceMongoRepository = new ServiceMongoRepository()
  return new DbDeleteService(serviceMongoRepository)
}

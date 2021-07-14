import { LoadServiceByBaseUrl } from '@/domain/usecases'
import { DbLoadServiceByBaseUrl } from '@/data/usecases'
import { ServiceSampleRepository } from '@/infra/db'

export const makeDbLoadServiceByBaseUrl = (): LoadServiceByBaseUrl => {
  const apiSampleRepository = new ServiceSampleRepository()
  return new DbLoadServiceByBaseUrl(apiSampleRepository)
}

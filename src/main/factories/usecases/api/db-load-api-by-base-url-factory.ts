import { LoadApiByBaseUrl } from '@/domain/usecases'
import { DbLoadApiByBaseUrl } from '@/data/usecases'
import { ApiSampleRepository } from '@/infra/db'

export const makeDbLoadApiByBaseUrl = (): LoadApiByBaseUrl => {
  const apiSampleRepository = new ApiSampleRepository()
  return new DbLoadApiByBaseUrl(apiSampleRepository)
}

import { adaptRoute } from '@/main/adapters'
import { makeAddServiceController, makeDeleteServiceController, makeLoadServicesController, makeUpdateServiceController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/services', adaptRoute(makeAddServiceController()))
  router.get('/services', adaptRoute(makeLoadServicesController()))
  router.delete('/services/:serviceId', adaptRoute(makeDeleteServiceController()))
  router.patch('/services/:serviceId', adaptRoute(makeUpdateServiceController()))
}

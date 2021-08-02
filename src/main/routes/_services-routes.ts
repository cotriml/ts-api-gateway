import { adaptRoute } from '@/main/adapters'
import { makeAddServiceController, makeDeleteServiceController, makeLoadServicesController, makeUpdateServiceController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/services', adminAuth, adaptRoute(makeAddServiceController()))
  router.get('/services', adminAuth, adaptRoute(makeLoadServicesController()))
  router.delete('/services/:serviceId', adminAuth, adaptRoute(makeDeleteServiceController()))
  router.patch('/services/:serviceId', adminAuth, adaptRoute(makeUpdateServiceController()))
}
